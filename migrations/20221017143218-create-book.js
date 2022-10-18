"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      publisher: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "genres",
          key: "id",
        },
      },
      sypnosis: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      copiesAvailable: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      epubUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      totalPages: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      totalLoans: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("books");
  },
};
