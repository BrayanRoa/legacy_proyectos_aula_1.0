import { Model, sequelize, DataTypes } from "../conexion";
import { GrupoResponse } from '../../shared/interfaces/materia-response.interface';
import { GrupoPersona } from './grupo-persona.model';
import { ProyectoGrupo } from './proyecto-grupo.model';

export class Grupo extends Model implements GrupoResponse{
  declare cod_grupo: number;
  declare nombre: string;
  declare cod_asignatura: string;
  declare cantidad_alumnos: number;
}

Grupo.init(
  {
    cod_grupo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    cod_materia: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    cantidad_alumnos: {
      type: DataTypes.TINYINT,
      defaultValue: 20,
    },
  },
  {
    sequelize,
    modelName: "grupo",
    timestamps: false,
  }
);

Grupo.hasMany(GrupoPersona, {foreignKey:'id_grupo'})
GrupoPersona.belongsTo(Grupo, {foreignKey:'id_grupo'})

Grupo.hasMany(ProyectoGrupo, {foreignKey:'cod_grupo'})
ProyectoGrupo.belongsTo(Grupo, {foreignKey:'cod_grupo'})

