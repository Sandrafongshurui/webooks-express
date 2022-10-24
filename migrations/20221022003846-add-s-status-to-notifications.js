'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('notifications', 'status', { type: Sequelize.INT, defaultValue : 0});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('notifications', 'status', { type: Sequelize.INT, defaultValue : 0});
  }
};