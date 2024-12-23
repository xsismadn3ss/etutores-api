'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inscripcion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inscripcion.belongsTo(models.Persona,{
        foreignKey: 'id',
        as: 'persona'
      })
      Inscripcion.belongsTo(models.Materia, {
        foreignKey: 'id',
        as: 'materia'
      })
    }
  }
  Inscripcion.init({
    persona: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Persona',
        key: 'id'
      }
    },
    materia: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Materia',
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Inscripcion',
  });
  return Inscripcion;
};