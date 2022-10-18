'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class annotations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.annotation.hasOne(models.loan);
    }
  }
  annotations.init({
    page: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    loanId: {
      type: DataTypes.integer,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    text: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'annotation',
  });
  return annotations;
};