// import { HttpResponse } from '../../shared/response/http-response';
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "../../shared/middlewares/base.middleware";
import { HttpResponse } from "../../shared/response/http-response";
import { TokenService } from "../../shared/services/token.service";
import { MateriaDTO } from "../dto/materia.dto";

export class MateriaMiddleware extends BaseMiddleware {
  constructor(
    protected readonly httpResponse: HttpResponse = new HttpResponse(),
    protected readonly tokenService: TokenService = new TokenService()
  ) {
    super(httpResponse, tokenService);
  }

  materiaValidator(req: Request, res: Response, next: NextFunction) {
    const { nombre, cod_asignatura } = req.body;

    const valid = new MateriaDTO();
    valid.nombre = nombre;
    valid.cod_asignatura = cod_asignatura;

    validate(valid, { whitelist: true, forbidNonWhitelisted: true }).then(
      (err) => {
        if (err.length > 0) {
          return this.httpResponse.Error(res, err);
        } else {
          next();
        }
      }
    );
  }
}
