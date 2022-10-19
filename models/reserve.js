'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reserve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.reserve.belongsTo(models.book);
      models.reserve.belongsTo(models.user);
    }
  }
  reserve.init({
    userId:{
      type: DataTypes.INTEGER,
      validate: {
        allowNull:false,
        notEmpty: true,
      },
    },
    loanId:{
      type: DataTypes.INTEGER,
      validate: {
        allowNull:false,
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'reserve',
  });
  return reserve;
};