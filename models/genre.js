"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.genre.hasMany(models.books);
    }
  }
  genre.init(
    {
      genreName: {
        type: DataTypes.STRING,

        validate: {
          notNull: true,
          notEmpty: true,
          isAlpha: true,
        },
      },
    },
    {
      sequelize,
      modelName: "genre",
    }
  );
  return genre;
};
