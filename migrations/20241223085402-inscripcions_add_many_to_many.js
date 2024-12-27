'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Inscripcions', {
      fields: ['persona'],
      type: 'foreign key',
      name: 'persona',
      references: {
        table: 'Personas',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    await queryInterface.addConstraint('Inscripcions', {
      fields: ['materia'],
      type: 'foreign key',
      name: 'materia',
      references: {
        table: 'Materia',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Inscripciones', 'persona')
    await queryInterface.removeConstraint('Inscripciones', 'materia')
  }
};
