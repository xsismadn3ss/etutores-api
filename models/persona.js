'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Persona.init({
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE,
    sexo: DataTypes.INTEGER,
    email: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    activo: {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};