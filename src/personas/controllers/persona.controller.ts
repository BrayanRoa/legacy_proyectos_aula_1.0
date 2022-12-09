import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http-response";
import { PersonaService } from "../services/persona.service";
import { PersonaDTO } from "../dto/create-persona.dto";

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
      (data[0] === 0)
        ?this.httpResponse.Ok(res, `No se actualizo ningun campo`)
        :this.httpResponse.Ok(res, `Campos actualizados con exito!!!`)
    } catch (error) {
      this.httpResponse.Error(res, error)
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

  async deleteUser(_req: Request, _res: Response) {}
}
