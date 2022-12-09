import { sequelize, Model, DataTypes } from "../conexion";
import { ProyectoResponse } from "../../shared/interfaces/proyecto-response.interface";
import { Avance } from "./avance.model";
import { ProyectoGrupo } from './proyecto-grupo.model';
import { MateriaProyecto } from "./materia-proyecto.model";
import { ProyectoPersona } from './proyecto-persona.model';

export class Proyecto extends Model implements ProyectoResponse {
  declare cod_proyecto: number;
  declare nombres: string;
  declare estado: string;
  declare activo: boolean;
  declare descripcion: string;
  declare cantidad_alumnos: number;
}

Proyecto.init(
  {
    cod_proyecto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    cantidad_alumnos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "proyecto",
    timestamps: false,
  }
);

Proyecto.hasMany(Avance, { foreignKey: "cod_proyecto" });
Avance.belongsTo(Proyecto, { foreignKey: "cod_proyecto" });

Proyecto.hasMany(ProyectoGrupo, {foreignKey:'cod_proyecto'})
ProyectoGrupo.belongsTo(Proyecto, {foreignKey:'cod_proyecto'})

Proyecto.hasMany(MateriaProyecto, {foreignKey:'cod_proyecto'})
MateriaProyecto.belongsTo(Proyecto, {foreignKey:'cod_proyecto'})

Proyecto.hasMany(ProyectoPersona, {foreignKey:'cod_proyecto'})
ProyectoPersona.belongsTo(Proyecto, {foreignKey:'cod_proyecto'})