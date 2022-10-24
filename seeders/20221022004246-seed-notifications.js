'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


    await queryInterface.bulkInsert("notifications", [
      {
        userId: 5,
        message:`Moby Dick was returned on ${new Date("2022-08-25").toDateString()}`,
        createdAt: new Date("2022-08-25").toISOString(),
        updatedAt: new Date("2022-08-25").toISOString(),
      },
      {
        userId: 5,
        message:`Peter Pan was renewed on ${new Date("2022-08-25").toDateString()}`,
        createdAt: new Date("2022-08-25").toISOString(),
        updatedAt: new Date("2022-08-25").toISOString()
      },
      {
        userId: 5,
        message:`Peter Pan was transferred from your reserve to your loan list on ${new Date("2022-09-25").toDateString()}`,
        createdAt: new Date("2022-09-25").toISOString(),
        updatedAt: new Date("2022-09-25").toISOString()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notifications', null, {});
  }
};
