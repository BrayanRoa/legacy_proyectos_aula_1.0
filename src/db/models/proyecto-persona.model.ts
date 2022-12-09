import { sequelize, Model, DataTypes} from '../conexion'

export class ProyectoPersona extends Model{}

ProyectoPersona.init({
    correo_institucional:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    cod_proyecto:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    modelName:'proyecto_persona',
    timestamps:false
})