"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      firstName: {
        type: DataTypes.STRING,

        validate: {
          notNull: true,
          notEmpty: true,
          len: 4,
          isAlpha: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,

        validate: {
          notNull: true,
          notEmpty: true,
          len: 4,
          isAlpha: true,
        },
      },
      email: {
        type: DataTypes.STRING,

        validate: {
          notNull: true,
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        notNull: true,
      },
      is_librarian: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
