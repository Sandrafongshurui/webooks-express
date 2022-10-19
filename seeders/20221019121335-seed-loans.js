'use strict';
const dateMethods  = require("../utils/date_methods")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("loans", [
      {
        userId: 2,
        bookId:6,
        bookProgress: "0",
        dueDate: dateMethods.addDays(new Date(), 21),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        userId: 2,
        bookId:7,
        bookProgress: "0",
        dueDate: dateMethods.addDays(new Date(), 21),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        userId: 3,
        bookId:6,
        bookProgress: "0",
        dueDate: dateMethods.addDays(new Date(), 21),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('loans', null, {});
    
  }
};
