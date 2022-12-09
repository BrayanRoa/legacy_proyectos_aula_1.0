import { sequelize, Model, DataTypes } from '../conexion'

export class GrupoPersona extends Model{}

GrupoPersona.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    correo_institucional:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    id_grupo:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    cancelada:{
        type:DataTypes.BOOLEAN,
        defaultValue: false,
    }
},
{
    sequelize,
    modelName:'grupo_persona',
    timestamps:false
})

