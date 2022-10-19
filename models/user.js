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
      models.user.hasMany(models.loan);
      models.user.hasMany(models.reserve);
      models.user.hasMany(models.favourite);
      models.user.hasMany(models.notification);
      models.user.belongsTo(models.genre);
    }
  }
  user.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {        
          notEmpty: true,
          len: 4,
          isAlpha: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {         
          notEmpty: true,
          len: 2,
          isAlpha: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {    
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: 4,
        },
      },
      isLibrarian: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      genreId: {
        type: DataTypes.INTEGER,
      },
      profileImgUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
