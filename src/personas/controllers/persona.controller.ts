import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http-response";
import { PersonaService } from "../services/persona.service";
import { PersonaDTO } from "../dto/create-persona.dto";
import { FilesInterface } from "../../shared/interfaces/files.interface";

export class PersonaController {
  constructor(
    private readonly personaService: PersonaService = new PersonaService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getTeachers(_req: Request, res: Response) {
    try {
      const data = await this.personaService.findAllTeachers();
      data.length === 0
        ? this.httpResponse.NotFound(res, `No hay profesores registrados aún`)
        : this.httpResponse.Ok(res, data);
    } catch (error) {
      this.httpResponse.Error(res, error);
    }
  }

  async getPersonById(req: Request, res: Response) {
    const { correo } = req.params;
    try {
      const data = await this.personaService.findPersonByCorreo(correo);
      !data
        ? this.httpResponse.NotFound(
            res,
            `No hay persona registrada con el correo ${correo}`
          )
        : this.httpResponse.Ok(res, data);
    } catch (error) {
      this.httpResponse.Error(res, error);
    }
  }

  async createUser(req: Request, res: Response) {
    const person: PersonaDTO = req.body;
    try {
      const data = await this.personaService.createPerson(person);
      this.httpResponse.Create(res, data);
    } catch (error) {
      this.httpResponse.Error(res, error);
    }
  }

  async updatePersona(req: Request, res: Response) {
    
    const { correo } = req.params
    try {
      const data = await this.personaService.updatePerson(correo, req.body);
      if(data[0] === 0){
        return this.httpResponse.NotFound(res, `No se actualizo ningun campo`)
      }
      return this.httpResponse.Ok(res, `Campos actualizados con exito!!!`)
      
    } catch (error) {
      return this.httpResponse.Error(res, error)
    }
  }

  async registerPersonInCourse(req: Request, res: Response){
    const { materia, grupo } = req.params
    try {
      await this.personaService.registerInCourse(materia, grupo, req.body)
      this.httpResponse.Ok(res, `Registro exitoso`)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }

  async registerExcelOfPersonsInCourse(req: Request, res: Response){
    const {materia, grupo} = req.params
    try {
      const file = req.files?.archivo as unknown as FilesInterface
      const data = await this.personaService.insertExcelOfPersonsInCourse(file, materia, grupo);
      this.httpResponse.Create(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }

  async deleteUser(_req: Request, _res: Response) {}
}
