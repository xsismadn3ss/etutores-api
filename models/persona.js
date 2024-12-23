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
      Persona.belongsTo(models.Sexo, {
        foreignKey: 'id',
        as: 'sexo'
      });
      Persona.hasMany(models.Inscripcion, {
        foreignKey: 'persona',
        as: 'inscripciones'
      })
    }
  }
  Persona.init({
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    usuario: {
      type: DataTypes.STRING,
      unique: true
    },
    fechaNacimiento: DataTypes.DATE,
    sexo: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Sexo',
        key: 'id',
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    telefono: {
      type: DataTypes.INTEGER,
      unique: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};