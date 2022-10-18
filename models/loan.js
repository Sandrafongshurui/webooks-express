"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.loan.hasMany(models.books);
    }
  }
  loan.init(
    {
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
      bookProgress: {
        type: DataTypes.STRING,

        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      dueDate: {
        type: DataTypes.STRING,

        validate: {
          notNull: true,
          isDate: true,
        },
      },
    },
    {
      sequelize,
      modelName: "loan",
    }
  );
  return loan;
};
