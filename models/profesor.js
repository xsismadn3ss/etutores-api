"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class profesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      profesor.belongsTo(models.Persona, {
        foreignKey: "personaId",
        as: "persona",
      });
      profesor.hasMany(models.experiencia, {
        foreignKey: 'profesrorId',
        as: 'experiencias'
      }
      )
    }
  }
  profesor.init(
    {
      titulo: DataTypes.STRING,
      especialidad: DataTypes.STRING,
      biografia: DataTypes.STRING,
      personaId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Persona",
          key: "id",
        },
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "profesor",
    }
  );
  return profesor;
};
