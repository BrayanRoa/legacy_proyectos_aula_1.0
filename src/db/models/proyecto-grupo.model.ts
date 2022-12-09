import {sequelize, Model, DataTypes } from '../conexion'


export class ProyectoGrupo extends Model{}

ProyectoGrupo.init({
    cod_proyecto:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    cod_grupo:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    modelName:'proyecto_grupo',
    timestamps:false
})