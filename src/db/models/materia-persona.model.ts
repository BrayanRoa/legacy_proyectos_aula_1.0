import { sequelize, Model, DataTypes } from "../conexion";

export class MateriaPersona extends Model {}

MateriaPersona.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    correo_institucional: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    codigo_materia: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    cancelada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "materia_persona",
    timestamps: false,
  }
);
