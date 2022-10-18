'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.removeColumn('genres', 'createdAt', { type: Sequelize.DATE});
     await queryInterface.removeColumn('genres', 'updatedAt', { type: Sequelize.DATE});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('genres', 'createdAt', { type: Sequelize.DATE});
    await queryInterface.removeColumn('genres', 'updatedAt', { type: Sequelize.DATE});
  }
};
