import {Persona} from "../db/models/persona.model";

declare global {
  namespace Express {
    interface Request {
      persona: Persona;
      uid: string;
    }
  }
}
