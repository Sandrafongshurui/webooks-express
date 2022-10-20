'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("books", [

    ])
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('loans', null, {});
  }
};
