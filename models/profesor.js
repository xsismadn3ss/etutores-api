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
      // un profesor hace referencia a una persona
      profesor.belongsTo(models.Persona, {
        foreignKey: "id",
        as: "persona",
      });
      //un profesor tiene varias experiencias
      profesor.hasMany(models.experiencia, {
        foreignKey: "profesorId",
        as: "experiencias",
      });
      //un profesor puede tener varias materias
      profesor.hasMany(models.Materia, {
        foreignKey: "profesor",
        as: "materias",
      });
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
