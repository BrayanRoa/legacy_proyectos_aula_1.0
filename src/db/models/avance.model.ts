import { Model, sequelize, DataTypes } from "../conexion";
import { Proyecto } from "./proyecto.model";

export class Avance extends Model {}

Avance.init(
  {
    cod_avance: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_avance: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    cod_proyecto: {
      type: DataTypes.INTEGER,
      references: {
        model: Proyecto,
        key: "cod_proyecto",
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    enlace: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fecha_entrega: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    modelName: "avance",
    timestamps: false,
  }
);
