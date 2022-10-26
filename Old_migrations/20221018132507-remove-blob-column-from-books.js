'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('books', 'epubFile', { type: Sequelize.BLOB});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('books', 'epubFile', { type: Sequelize.BLOB});
  }
};
