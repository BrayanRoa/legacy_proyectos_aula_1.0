import { Grupo } from "../../db/models/grupo.model";
import { Asignatura } from "../../db/models/materia.model";
import { MateriaDTO } from '../dto/materia.dto';

export class MateriaService {

  constructor(){}

  async findAllSubjects() {
    const subjects = await Asignatura.findAll({
      include: [
        {
          model: Grupo,
          required: false,
          attributes: ["nombre", "cod_grupo"],
        },
      ],
    });
    return subjects
  }

  async findCourseByCode(materia:string){
    const subjects = await Asignatura.findOne({
      where:{cod_asignatura:materia},
      include: [
        {
          model: Grupo,
          required: true,
          attributes: ["nombre", "cod_grupo"],
        },
      ],
    })
    return subjects
  }

  async findCourseAndGroup(materia:string, grupo:string){
    const subjects = await Asignatura.findOne({
      where:{cod_asignatura:materia},
      include: [
        {
          model: Grupo,
          required: true,
          where:{nombre:grupo},
          attributes: ["nombre", "cod_grupo"],
        },
      ],
    })
    return subjects
  }

  async registerSubject(materia:MateriaDTO){
    const subject = await Asignatura.create({...materia})
    return subject
  }

  //* 👀 NO ESTOY VALIDANDO QUE EXISTA LA MATERIA PERO SI QUE EXISTA CON UN GRUPO
  async registerGroupInCourse(materia:string, grupo:string, num_alumnos:number){
    const exist = await this.findCourseAndGroup(materia, grupo)
    if(exist){
      throw new Error(`Ya existe el grupo ${grupo} para la materia ${materia}`)
    }
    await Grupo.create({nombre:grupo, cantidad_alumnos:num_alumnos, cod_materia:materia})
  }
}
