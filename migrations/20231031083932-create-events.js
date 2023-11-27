'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      accountid: {
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull : false
      },
      endDate: {
        type: Sequelize.DATE,
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull : false
      },
      endTime: {
        type: Sequelize.TIME,
      },
      price: {
        type: Sequelize.INTEGER
      },
      cityid: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      banner: {
        type: Sequelize.STRING
      },
      formatid: {
        type: Sequelize.INTEGER
      },
      topicid: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('events');
  }
};