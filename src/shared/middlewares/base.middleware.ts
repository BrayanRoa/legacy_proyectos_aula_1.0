import { Request, Response, NextFunction } from "express";
import { Persona } from "../../db/models/persona.model";
import { HttpResponse } from "../response/http-response";
import { TokenService } from "../services/token.service";
export class BaseMiddleware {
  readonly httpResponse: HttpResponse;
  readonly tokenService: TokenService;
  constructor(httpResponse: HttpResponse, tokenService: TokenService) {
    this.httpResponse = httpResponse;
    this.tokenService = tokenService;
  }

  async validarJwt(req: Request, res: Response, next: NextFunction) {
    const token = req.header("x-token");
    if (!token) {
      return this.httpResponse.Unauthorized(res, `No hay token en la petición`);
    }
    const data = await this.tokenService.verifyToken(token);
    if (!data) {
      return this.httpResponse.Unauthorized(
        res,
        `Token no válido - pongase en contacto con el administrador`
      );
    }
    req.persona = data as Persona;
    req.uid = req.persona.correo_institucional;
    next();
  }
}
