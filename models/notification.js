'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.notification.belongsTo(models.user);
    }
  }
  notification.init({
    userId:{
      type: DataTypes.INTEGER,
      validate: {
        allowNull:false,
        notEmpty: true,
      },
    },
    message: {
      type: DataTypes.STRING,
      validate: {
        allowNull:false,
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};