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
      models.loan.belongsTo(models.book);
      models.loan.belongsTo(models.user);
    }
  }
  loan.init(
    {
      userId: {
        type: DataTypes.INTEGER,

        allowNull:false,
        validate: {
          notEmpty: true,
        },
      },
      bookId: {
        type: DataTypes.INTEGER,

        allowNull:false,
        validate: {
          notEmpty: true,
        },
      },
      bookProgress: {
        type: DataTypes.STRING,

        allowNull:false,
        validate: {
          notEmpty: true,
        },
      },
      dueDate: {
        type: DataTypes.STRING,

        allowNull:false,
        validate: {
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
