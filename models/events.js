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
      events.belongsTo(models.accounts);
      events.belongsTo(models.topics);
      events.belongsTo(models.formats);
      events.belongsTo(models.cities);
    }
  }
  events.init({
    name: DataTypes.STRING,
    accountid: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    price: DataTypes.INTEGER,
    cityid: DataTypes.INTEGER,
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