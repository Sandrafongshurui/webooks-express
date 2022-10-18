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
      // {
      //   title: "Little Women; Or, Meg, Jo, Beth, and Amy",
      //   author:"Alcott, Louisa May",
      //   genreId:1,
      //   sypnosis:"Four sisters and their mother at home. Their father is fighting in the war. Louisa May Alcott semi-autobiographical novel has captured young women and the young at heart for years. On Christmas evening they receive a lovely dinner by their nieighbor James Laurence. Jo meets the old mans grandson at a dance. Jo, Amy, Beth, and Meg befriend him. Join in the hope, joy, surprise, disappoints, and love in one of my faves Little Women. Also the books Litttle Men, and Jo's Boys and how they grew up.",
      //   copiesAvailable:10,
      //   epubUrl:"https://www.gutenberg.org/ebooks/37106.epub3.images",
      //   totalLoans:102,
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString(),
      //   bookCover: "https://www.gutenberg.org/cache/epub/37106/pg37106.cover.medium.jpg"
      // },
      {
        title: "A Life For a Love: A Novel",
        author:"Meade, L. T.",
        genreId:1,
        sypnosis:"Leo is an obituary writer; Emma a well-known marine biologist. When she suffers a serious illness, Leo copes by doing what he knows best – researching and writing about his wife's life. But as he starts to unravel the truth, he discovers the woman he loves doesn't really exist. Even her name isn't real.",
        copiesAvailable:20,
        epubUrl:"https://www.gutenberg.org/ebooks/37107.epub3.images",
        totalLoans:55,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        bookCover: "https://www.gutenberg.org/cache/epub/37107/pg37107.cover.medium.jpg"
      },
      {
        title: "Cedric, the Forester",
        author:"Marshall, Bernard Gay",
        genreId:1,
        sypnosis:"Narrated by Sir Dickon Mountjoy, a twelfth-century Norman nobleman, the novel describes his lifelong friendship with Cedric of Pelham Wood, a Saxon yeoman. Cedric the forester saves Sir Dickon's life and is made his squire. The two men become friends and have many adventures. Cedric eventually becomes the best crossbowman in England, and is knighted. Much of the novel is set in the time of King Richard the Lion Hearted, but in the final chapter Cedric plays a pivotal role in the signing of the Great Charter of King John.",
        copiesAvailable:5,
        epubUrl:"https://www.gutenberg.org/ebooks/37102.epub3.images",
        totalLoans:30,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        bookCover: "https://www.gutenberg.org/cache/epub/37102/pg37102.cover.medium.jpg"
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
