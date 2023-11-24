'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      topics.hasMany(models.events)
    }
  }
  topics.init({
    topic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'topics',
  });
  return topics;
};