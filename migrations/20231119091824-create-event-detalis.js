'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event_detalis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      idpromotor: {
        type: Sequelize.INTEGER,
        allowNull : false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull : false
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull : false
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull : false
      },
      endTime: {
        type: Sequelize.TIME,
        allowNull : false
      },
      location: {
        type: Sequelize.STRING,
        allowNull : false
      },
      city: {
        type: Sequelize.STRING,
        allowNull : false
      },
      idformat: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      idtopic: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      idcategory: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('event_detalis');
  }
};