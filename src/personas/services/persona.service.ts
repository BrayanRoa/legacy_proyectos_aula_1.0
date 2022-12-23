import { MateriaPersona } from "../../db/models/materia-persona.model";
import { Persona } from "../../db/models/persona.model";
// import { TipoDocumento } from '../../db/models/tipo-documento.model';
import { PersonaDTO } from "../dto/create-persona.dto";
import { UpdatePersona } from "../dto/update-persona.dto";
import { GrupoPersona } from "../../db/models/grupo-persona.model";
// import { Mail } from "../../shared/mail/mail";
import readXlsxFile from "read-excel-file/node";
import { FilesInterface } from "../../shared/interfaces/files.interface";
import { Archivo } from "../../shared/services/archivo.service";
import { Grupo } from "../../db/models/grupo.model";
import fs from "fs"
export class PersonaService {
  //* TODO: OJO AHORA ES MAIL-SERVICE
  // private readonly mail:Mail;

  constructor(private readonly archivo: Archivo = new Archivo()) {
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
    console.log({person});
    return person;
  }

  async updatePerson(correo_institucional: string, infoUpdate: UpdatePersona) {
    //* TODO: AQUI COLOCAR LO DE LA IMAGEN DE PERFIL
    infoUpdate.perfil_completado = true;
    console.log({ infoUpdate });
    const person = await Persona.update(infoUpdate, {
      where: { correo_institucional },
    });
    console.log({ person });
    return person;
  }

  async registerInCourse(materia: string, grupo: string, persona: PersonaDTO) {
    const { correo_institucional } = persona;
    const person = await this.findPersonByCorreo(correo_institucional);
    if (!person) {
      this.createPerson(persona);
    }
    await MateriaPersona.create({ correo_institucional, cod_materia: materia });
    await GrupoPersona.create({ correo_institucional, id_grupo: +grupo });
    // this.mail.sendMails(persona, materia, grupo) //* ESTA LISTO, SOLO QUE LO COMENTO PARA NO MANDAR CORREOS INNECESARIOS
    return true;
  }

  //* TODO: VALIDAR SI ESA PERSONA QUE SE QUIERE REGISTRAR TIENE ESA MATERIA CANCELADA SI ES ASI ENTONCES CAMBIAR EL ESTADO DE CANCELADA A FALSE
  async insertExcelOfPersonsInCourse(
    archivo: FilesInterface,
    materia: string,
    grupo: string
  ) {
    const pathArchivo = (await this.archivo.guardarArchivo(archivo)) as string;
    await readXlsxFile(pathArchivo).then(async (rows) => {
      rows.shift();

      for (const alumno of rows) {
        const exist = await this.existPersonInGruop(
          alumno[0].toString(),
          materia,
          grupo
        );
        if (!exist) {
          await this.registerInCourse(materia, grupo, {
            correo_institucional: alumno[0].toString(),
            nombres: alumno[1].toString(),
            apellidos: alumno[2].toString(),
            codigo: alumno[3].toString(),
            cod_rol: 2,
            perfil_completado: false,
          });
        }
      }
    });

    if(fs.existsSync(pathArchivo)){
      fs.unlinkSync(pathArchivo)
    }
  }

  async existPersonInGruop(
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
}
