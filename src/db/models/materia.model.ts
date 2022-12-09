import { GrupoResponse, Materia } from "../../shared/interfaces/materia-response.interface";
import { Model, DataTypes, sequelize } from "../conexion";
import {Grupo} from "./grupo.model";
import { MateriaPersona } from "./materia-persona.model";
import { MateriaProyecto } from "./materia-proyecto.model";

export class Asignatura extends Model implements Materia{
  declare cod_asignatura: string;
  declare nombre: string;
  declare grupos?: GrupoResponse[];
}

Asignatura.init(
  {
    cod_asignatura: {
      type: DataTypes.STRING(8),
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "materia",
    timestamps: false,
  }
);

Asignatura.hasMany(Grupo, {foreignKey: 'cod_materia'})
Grupo.belongsTo(Asignatura,{foreignKey:'cod_materia'})

Asignatura.hasMany(MateriaPersona, {foreignKey:'cod_materia'})
MateriaPersona.belongsTo(Asignatura,{foreignKey:'cod_materia'})

Asignatura.hasMany(MateriaProyecto, {foreignKey:'cod_materia'})
MateriaProyecto.belongsTo(Asignatura, {foreignKey:'cod_materia'})