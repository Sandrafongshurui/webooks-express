'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favourite.belongsTo(models.book);
      models.favourite.belongsTo(models.user);
    }
  }
  favourite.init({
    userId:{
      type: DataTypes.INTEGER,
      validate: {
        allowNull:false,
        notEmpty: true,
      },
    },
    bookId:{
      type: DataTypes.INTEGER,
      validate: {
        allowNull:false,
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'favourite',
  });
  return favourite;
};