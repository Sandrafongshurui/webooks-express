'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("genres", [
      {
        genreName: "Mystery",
      },
      {
        genreName: "Crime",
      },
      {
        genreName: "Family",
      },
      {
        genreName: "Thriller",
      },
      {
        genreName: "Psychological",
      },
      {
        genreName: "Biographies",
      },
      {
        genreName: "Fantasy",
      },
      {
        genreName: "Young Adult",
      },
      {
        genreName: "Classic",
      },
      {
        genreName: "Fiction",
      },
   
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('genres', null, {});
    
  }
};
