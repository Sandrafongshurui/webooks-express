'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('reserves','loanId','bookId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('reserves','loanId','bookId');
  }
};
