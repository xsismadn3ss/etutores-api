'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class experiencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      experiencia.belongsTo(models.profesor, {
        foreignKey: 'profesorId',
        as: 'profesor'
      })
    }
  }
  experiencia.init({
    fecha_inicio: DataTypes.DATEONLY,
    fecha_final: DataTypes.DATEONLY,
    lugar: DataTypes.STRING,
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue:true
    },
    profesorId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'profesor',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'experiencia',
  });
  return experiencia;
};