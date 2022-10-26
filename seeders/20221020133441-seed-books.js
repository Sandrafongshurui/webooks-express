"use strict";
const getBooksMethods = require("../utils/gutendex/gutendex");
let fetchedData = [];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    fetchedData = await getBooksMethods.getBooks(),
    console.log(fetchedData)
      await queryInterface.bulkInsert("books", fetchedData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("books", null, {});
  },
};
