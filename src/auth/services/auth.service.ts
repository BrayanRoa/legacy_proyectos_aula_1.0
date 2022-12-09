import * as jwt from "jsonwebtoken";
import { Persona } from "../../db/models/persona.model";
import { PersonaService } from "../../personas/services/persona.service";

export class AuthService {
  private readonly personaService: PersonaService;
  constructor(private readonly jwtInstance = jwt) {
    this.personaService = new PersonaService();
  }

  sign(payload: jwt.JwtPayload, secret: any) {
    return this.jwtInstance.sign(payload, secret);
  }

  public async generateJwt(
    correo_institucional:string
  ): Promise<{ accessToken: string; persona: Persona }> {
    const consultPerson = await this.personaService.findPersonByCorreo(
      correo_institucional
    );

    const payload = {
      correo_institucional: consultPerson!.correo_institucional,
      rol: consultPerson!.cod_rol,
    };

    return {
      accessToken: this.sign(payload, process.env.SECRET_JWT),
      persona: consultPerson!,
    };
  }
}
