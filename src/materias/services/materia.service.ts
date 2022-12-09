import { Grupo } from "../../db/models/grupo.model";
import { Asignatura } from "../../db/models/materia.model";

export class MateriaService {
  async findAllSubjects() {
    const subjects = await Asignatura.findAll({
      include: [
        {
          model: Grupo,
          required: true,
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
          where:{cod_grupo:grupo},
          attributes: ["nombre", "cod_grupo"],
        },
      ],
    })
    return subjects
  }
}
