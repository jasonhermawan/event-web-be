'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      event_details.belongsTo(models.event_format, {
        foreignKey: "idformat",
      });
      event_details.belongsTo(models.event_topic, {
        foreignKey: "idtopic",
      });
      event_details.hasMany(models.ticket, {
        foreignKey: "idevent",
      });
      event_details.hasMany(models.banner, {
        foreignKey: "idevent",
      });
    }
  }
  event_details.init({
    name: DataTypes.STRING,
    idpromotor: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    location: DataTypes.STRING,
    city: DataTypes.STRING,
    idformat: DataTypes.INTEGER,
    idtopic: DataTypes.INTEGER,
    idcategory: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'event_details',
  });
  return event_details;
};