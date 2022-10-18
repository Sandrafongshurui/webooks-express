"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
     //https://www.gutenberg.org/ebooks/37106.epub3.images
    await queryInterface.bulkInsert("books", [
      {
        title: "Little Women; Or, Meg, Jo, Beth, and Amy",
        author:"Alcott, Louisa May",
        genre:1,
        sypnosis:"this is a symnopsis",
        copiesAvailable:10,
        epubUrl:"https://www.gutenberg.org/ebooks/37106.epub3.images",
        totalLoans:100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        bookCover: "https://www.gutenberg.org/cache/epub/37106/pg37106.cover.medium.jpg"
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('books', null, {});
  },
};
