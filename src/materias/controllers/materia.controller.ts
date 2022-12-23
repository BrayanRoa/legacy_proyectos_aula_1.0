import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http-response";
import { MateriaService } from "../services/materia.service";
import { MateriaDTO } from "../dto/materia.dto";

export class MateriaController {
  private readonly httpResponse: HttpResponse;
  private readonly materiasService: MateriaService;

  constructor() {
    this.httpResponse = new HttpResponse();
    this.materiasService = new MateriaService();
  }

  async getAllSubjects(_req: Request, res: Response) {
    try {
      const data = await this.materiasService.findAllSubjects();
      data.length === 0
        ? this.httpResponse.NotFound(res, `No existen materias`)
        : this.httpResponse.Ok(res, data);
    } catch (error) {
      this.httpResponse.Error(res, error);
    }
  }

  async getOneSubject(req: Request, res: Response) {
    const { codigo } = req.params;
    try {
      const data = await this.materiasService.findCourseByCode(codigo);
      !data
        ? this.httpResponse.NotFound(
            res,
            `No existe materia con codigo ${codigo}`
          )
        : this.httpResponse.Ok(res, data);
    } catch (error) {
      this.httpResponse.Error(res, error);
    }
  }

  async createSubject(req: Request, res: Response) {
    const materia: MateriaDTO = req.body;
    try {
      const data = await this.materiasService.registerSubject(materia);
      this.httpResponse.Create(res, data);
    } catch (error) {
      this.httpResponse.Error(res, error);
    }
  }

  async createGruopOfSubject(req: Request, res: Response){
    const { materia } = req.params
    const { grupo, cantidad_alumnos } = req.body
    try {
        await this.materiasService.registerGroupInCourse(materia, grupo, cantidad_alumnos)
        this.httpResponse.Create(res, `Grupo registro con exito`)
    } catch (error:any) {
        this.httpResponse.Error(res, error.message)
    }
  }

  //* un alumno o profesor puede visualizar sus materias
  async getAllMySubjects() {}
}
