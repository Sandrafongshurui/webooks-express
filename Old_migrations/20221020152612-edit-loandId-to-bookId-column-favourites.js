'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('favourites','loanId','bookId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('favourites','loanId','bookId');
  }
};
