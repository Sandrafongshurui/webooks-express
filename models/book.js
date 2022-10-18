"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.book.hasOne(models.genre);
    }
  }
  book.init(
    {
      title: {
        type: DataTypes.STRING,

        validate: {
          notNull: true,
          notEmpty: true,
          is: /^[a-zA-Z0-9\s]+$/,
        },
      },
      author: {
        type: DataTypes.STRING,

        validate: {
          notNull: true,
          notEmpty: true,
          //letters and spaces
          is: /^[a-zA-Z\s]+$/,
        },
      },
      genre: {
        type: DataTypes.INTEGER,

        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      publisher: {
        type: DataTypes.STRING,

        validate: {
          notNull: true,
          notEmpty: true,
          // \w letter, numbers underscores, \s for pscaes tabe lins breaks
          is: /^[-\w\s]+$/,
        },
      },
      sypnosis: {
        type: DataTypes.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
          is: /^[-\w\s]+$/,
        },
      },
      copiesAvailable: {
        type: DataTypes.INTEGER,

        validate: {
          notNull: true,
          notEmpty: true,
          isNumeric: true,
        },
      },
      epubUrl: {
        type: DataTypes.STRING,

        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      totalPages: {
        type: DataTypes.INTEGER,

        validate: {
          notNull: true,
          notEmpty: true,
          isNumeric: true,
        },
      },
      totalLoans: {
        type: DataTypes.INTEGER,

        validate: {
          notNull: true,
          notEmpty: true,
          isNumeric: true,
        },
      },
    },
    {
      sequelize,
      modelName: "book",
    }
  );
  return book;
};
