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
      models.book.belongsTo(models.genre);
    }
  }
  book.init(
    {
      title: {
        type: DataTypes.STRING,

        validate: {
          allowNull:false,
          notEmpty: true,
          is: /^[a-zA-Z0-9\s]+$/,
        },
      },
      author: {
        type: DataTypes.STRING,

        validate: {
          allowNull:false,
          notEmpty: true,
          //letters and spaces
          is: /^[a-zA-Z\s]+$/,
        },
      },
      genreId: {
        type: DataTypes.INTEGER,

        validate: {
          allowNull:false,
          notEmpty: true,
        },
      },
      sypnosis: {
        type: DataTypes.STRING,
        validate: {
          allowNull:false,
          notEmpty: true,
          is: /^[-\w\s]+$/,
        },
      },
      copiesAvailable: {
        type: DataTypes.INTEGER,

        validate: {
          allowNull:false,
          notEmpty: true,
          isNumeric: true,
        },
      },
      epubUrl: {
        type: DataTypes.STRING,

        validate: {
          allowNull:false,
          notEmpty: true,
        },
      },
      totalLoans: {
        type: DataTypes.INTEGER,

        validate: {
          allowNull:false,
          notEmpty: true,
          isNumeric: true,
        },
      },
      bookCover: {
        type: DataTypes.STRING,
        validate: {
          allowNull:false,
          notEmpty: true,
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
