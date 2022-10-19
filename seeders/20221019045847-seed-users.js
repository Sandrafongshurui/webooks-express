'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@email.com",
        genreId:1,
        password: "$2b$10$Aw/VHpqMdpwm3Fiix5tUqe9ZAIShN0JHB42ItCspFB9RAqmgB.KaW",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },{
        firstName: "Mickey",
        lastName: "Mouse",
        email: "mickey@email.com",
        genreId:2,
        password: "$2b$10$oZtI93C/W5SvwRzzo5Z7Yeojb3U695aM/IO0xhtwek3lStC8MAMNi",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },{
        firstName: "Harry",
        lastName: "Potter",
        email: "harry@email.com",
        genreId:1,
        password: "$2b$10$7KLgKCC0x0bG2omB2JWSGuxAVQQ547YldO1z5GwD8sidOLh/p5zNC",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
