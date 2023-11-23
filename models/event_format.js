'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event_format extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      event_format.hasMany(models.event_details, {
        foreignKey: "idformat",
      });
    }
  }
  event_format.init({
    format: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'event_format',
  });
  return event_format;
};