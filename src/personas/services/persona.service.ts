import { MateriaPersona } from "../../db/models/materia-persona.model";
import { Persona } from "../../db/models/persona.model";
// import { TipoDocumento } from '../../db/models/tipo-documento.model';
import { PersonaDTO } from "../dto/create-persona.dto";
import { UpdatePersona } from "../dto/update-persona.dto";
import { GrupoPersona } from '../../db/models/grupo-persona.model';
// import { Mail } from "../../shared/mail/mail";

export class PersonaService {

  // private readonly mail:Mail;

  constructor() {
    // this.mail = new Mail()
  }

  async findAllTeachers(): Promise<Persona[]> {
    const persons = await Persona.findAll({
      where: { cod_rol: 1 },
    });
    return persons;
  }

  async findPersonByCorreo(correo_institucional: string) {
    const person = await Persona.findByPk(correo_institucional);
    return person;
  }

  async createPerson(data: PersonaDTO): Promise<Persona> {
    const person = await Persona.create({ ...data });
    return person;
  }

  async updatePerson(correo_institucional: string, infoUpdate: UpdatePersona) {
    //* TODO: AQUI COLOCAR LO DE LA IMAGEN DE PERFIL
    infoUpdate.perfil_completado = true
    const person = await Persona.update(infoUpdate, {
      where: { correo_institucional },
    });
    return person
  }

  async registerInCourse(materia:string, grupo:string, persona:PersonaDTO){
    const {correo_institucional} = persona
    const person = await this.findPersonByCorreo(correo_institucional)
    if(!person){
      this.createPerson(persona)
    }
    await MateriaPersona.create({correo_institucional, cod_materia:materia})
    await GrupoPersona.create({correo_institucional, id_grupo:grupo})
    // this.mail.sendMails(persona, materia, grupo) //* ESTA LISTO, SOLO QUE LO COMENTO PARA NO MANDAR CORREOS INNECESARIOS
    return true
  }
}
