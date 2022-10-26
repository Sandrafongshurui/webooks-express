'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('books', 'totalPages', { type: Sequelize.INTEGER});
    await queryInterface.removeColumn('books', 'publisher', { type: Sequelize.STRING});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('books', 'totalPages', { type: Sequelize.INTEGER});
  }
};
