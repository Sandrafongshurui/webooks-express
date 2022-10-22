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
      models.annotation.belongsTo(models.loan);
    }
  }
  annotations.init({
    page: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        
        notEmpty: true,
      },
    },
    loanId: {
      type: DataTypes.INTEGER,
        allowNull:false,
      validate: {
        notEmpty: true,
      },
    },
    text: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'annotation',
  });
  return annotations;
};