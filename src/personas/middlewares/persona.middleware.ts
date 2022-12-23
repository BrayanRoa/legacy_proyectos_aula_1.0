import { Request, Response, NextFunction } from "express";
import { PersonaDTO } from "../dto/create-persona.dto";
import { validate } from "class-validator";
import { UpdatePersona } from "../dto/update-persona.dto";
import { Asignatura } from "../../db/models/materia.model";
import { Grupo } from "../../db/models/grupo.model";
import { Persona } from "../../db/models/persona.model";
import { GrupoPersona } from "../../db/models/grupo-persona.model";
import { BaseMiddleware } from "../../shared/middlewares/base.middleware";
import { HttpResponse } from "../../shared/response/http-response";
import { TokenService } from "../../shared/services/token.service";
import { FilesInterface } from "../../shared/interfaces/files.interface";
import { Op } from "sequelize";

export class PersonaMidlleware extends BaseMiddleware {
  constructor(
    tokenService: TokenService = new TokenService(),
    httpResponse: HttpResponse = new HttpResponse()
  ) {
    super(httpResponse, tokenService);
  }

  personValidator(req: Request, res: Response, next: NextFunction) {
    const {
      correo_institucional,
      nombres,
      apellidos,
      cod_tipo_doc,
      cod_rol,
      codigo,
      documento,
      celular,
      img,
      perfil_completado,
    } = req.body;

    const valid = new PersonaDTO();

    valid.correo_institucional = correo_institucional;
    valid.nombres = nombres;
    valid.apellidos = apellidos;
    valid.cod_tipo_doc = cod_tipo_doc;
    valid.cod_rol = cod_rol;
    valid.codigo = codigo;
    valid.documento = documento;
    valid.celular = celular;
    valid.img = img;
    valid.perfil_completado = perfil_completado;

    validate(valid, { whitelist: true, forbidNonWhitelisted: true }).then(
      (err) => {
        if (err.length > 0) {
          return this.httpResponse.Error(res, err);
        } else {
          return next();
        }
      }
    );
  }

  updatePersonaValidator(req: Request, res: Response, next: NextFunction) {
    const { documento, celular, img, perfil_completado } = req.body;

    const valid = new UpdatePersona();

    valid.documento = documento;
    valid.celular = celular;
    valid.img = img;
    valid.perfil_completado = perfil_completado;
    validate(valid, { whitelist: true, forbidNonWhitelisted: true }).then(
      (err) => {
        if (err.length > 0) {
          this.httpResponse.Error(res, err);
        } else {
          next();
        }
      }
    );
  }

  async existGroupAndCourse(req: Request, res: Response, next: NextFunction) {
    const { materia, grupo } = req.params;
    const { correo_institucional } = req.persona ??= req.body;
    const course = await Asignatura.findByPk(materia);
    if (!course) {
      return this.httpResponse.NotFound(
        res,
        `No existe materia con codigo: ${materia}`
      );
    }

    const group = await Grupo.findOne({
      where: {
        [Op.or]:[
          {cod_materia: materia, nombre: grupo},
          {cod_materia: materia, cod_grupo: grupo}
        ]
      }
    });

    if (!group) {
      return this.httpResponse.NotFound(
        res,
        `No existe el grupo ${grupo} para la materia ${materia}`
      );
    }
    req.params.grupo = group.cod_grupo.toString();

    const exist = await this.existPersonInGruop(
      correo_institucional,
      materia,
      req.params.grupo
    );
    if (exist) {
      return this.httpResponse.NotFound(
        res,
        `La persona ya esta registrada en el grupo ${grupo} de la materia ${materia}`
      );
    }
    return next();
  }

  private async existPersonInGruop(
    correo_institucional: string,
    materia: string,
    grupo: string
  ) {
    const existe = await Persona.findOne({
      where: { correo_institucional },
      include: [
        {
          model: GrupoPersona,
          where: { id_grupo: grupo, correo_institucional },
          required: true,
          include: [
            {
              model: Grupo,
              where: { cod_materia: materia, cod_grupo: grupo },
              required: true,
            },
          ],
        },
      ],
    });

    return existe;
  }

  existeArchivo(req: Request, res: Response, next: NextFunction) {

    const extValidas = ['csv', 'xlsx', 'xls', 'xlsm']

    if (
      !req.files ||
      Object.keys(req.files).length === 0 ||
      !req.files.archivo
    ) {
      return this.httpResponse.NotFound(res,`No hay archivos en la petición.`)
    }

    const {name} = (req.files?.archivo) as unknown as FilesInterface
    const aux = name.split('.')
    
    if(!extValidas.includes(aux[aux.length-1])){
      return this.httpResponse.Error(res, `Extensión del archivo invalida - ext validas: ${extValidas}`)
    }
    next()
  }
}
