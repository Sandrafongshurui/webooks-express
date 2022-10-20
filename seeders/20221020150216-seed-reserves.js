'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("reserves", [
      {
        userId: 2,
        bookId:6,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        userId: 5,
        bookId:6,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reserves', null, {});
  }
};
