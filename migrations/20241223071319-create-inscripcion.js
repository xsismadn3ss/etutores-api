'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Inscripcions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      persona: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Persona',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      materia: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Materia',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Inscripcions');
  }
};