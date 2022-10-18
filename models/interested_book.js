"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class interested_book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.interested_book.hasOne(models.book);
      models.interested_book.hasOne(models.user);    
    }
  }
  interested_book.init(
    {
      isFavourite: {
        type: DataTypes.BOOLEAN,

        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      isReserve: {
        type: DataTypes.BOOLEAN,

        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      userId: {
        type: DataTypes.INTEGER,

        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      bookId: {
        type: DataTypes.INTEGER,

        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "interested_book",
    }
  );
  return interested_book;
};
