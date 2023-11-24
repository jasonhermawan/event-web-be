'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  events.init({
    name: DataTypes.STRING,
    accountid: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    price: DataTypes.INTEGER,
    city: DataTypes.STRING,
    location: DataTypes.STRING,
    banner: DataTypes.STRING,
    formatid: DataTypes.INTEGER,
    topicid: DataTypes.INTEGER,
    description: DataTypes.STRING,
    categoryid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};