'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Materia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      codigo: {
        type: Sequelize.STRING
      },
      accesibilidad: {
        type: Sequelize.STRING
      },
      titulo: {
        type: Sequelize.STRING
      },
      requisitos: {
        type: Sequelize.STRING
      },
      inversion: {
        type: Sequelize.DOUBLE
      },
      inicia: {
        type: Sequelize.DATE
      },
      finaliza: {
        type: Sequelize.DATE
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Materia');
  }
};