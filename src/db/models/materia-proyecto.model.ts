import { sequelize, Model, DataTypes } from '../conexion'

export class MateriaProyecto extends Model{}

MateriaProyecto.init({
    cod_materia:{
        type:DataTypes.STRING(8),
        allowNull:false
    },
    cod_proyecto:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    modelName:'materia_proyecto',
    timestamps:false
})

