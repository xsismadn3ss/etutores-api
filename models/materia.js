'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Materia.hasMany(models.Inscripcion, {
        foreignKey: 'materias',
        as: 'inscripciones'
      })
    }
  }
  Materia.init({
    nombre: DataTypes.STRING,
    codigo: DataTypes.STRING,
    accesibilidad: DataTypes.STRING,
    titulo: DataTypes.STRING,
    requisitos: DataTypes.STRING,
    inversion: DataTypes.DOUBLE,
    inicia: DataTypes.DATE,
    finaliza: DataTypes.DATE,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Materia',
  });
  return Materia;
};