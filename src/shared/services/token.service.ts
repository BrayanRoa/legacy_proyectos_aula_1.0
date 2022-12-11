import { Persona } from "../../db/models/persona.model";
import { PersonaService } from "../../personas/services/persona.service";
import * as jwt from "jsonwebtoken";

interface JwtPayload {
  uuid: string;
}

export class TokenService {
  private readonly jwtInstance;
  private readonly personaService: PersonaService;
  constructor() {
    this.jwtInstance = jwt;
    this.personaService = new PersonaService();
  }

  private sign(payload: jwt.JwtPayload, secret: any) {
    return this.jwtInstance.sign(payload, secret);
  }

  public async generateJwt(
    correo_institucional: string
  ): Promise<{ accessToken: string; persona: Persona }> {
    const consultPerson = await this.personaService.findPersonByCorreo(
      correo_institucional
    );

    const payload = {
      uuid: consultPerson!.correo_institucional,
      rol: consultPerson!.cod_rol,
    };

    return {
      accessToken: this.sign(payload, process.env.SECRET_JWT),
      persona: consultPerson!,
    };
  }

  public async verifyToken(data: any): Promise<boolean | Persona> {
    const { uuid } = this.jwtInstance.verify(
      data,
      process.env.SECRET_JWT!
    ) as JwtPayload;

    const person = await this.personaService.findPersonByCorreo(uuid);

    if (!person) {
      return false;
    }
    return person;
  }
}
