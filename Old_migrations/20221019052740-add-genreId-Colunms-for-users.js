'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'genreId', {type: Sequelize.INTEGER,
      references: {
        model: "genres",
        key: "id",
      }, });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'genreId', { type: Sequelize.INTEGER,
      references: {
        model: "genres",
        key: "id",
      }, });
  }
};



