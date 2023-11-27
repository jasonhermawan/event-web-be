'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('tickets', [
    {
      name: "Regular",
      qty: 200,
      price: 700000,
      type: "paid",
      eventid: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VIP",
      qty: 100,
      price: 1000000,
      type: "paid",
      eventid: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VVIP",
      qty: 200,
      price: 2000000,
      type: "paid",
      eventid: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Regular",
      qty: 200,
      price: 100000,
      type: "paid",
      eventid: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VIP",
      qty: 100,
      price: 500000,
      type: "paid",
      eventid: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VVIP",
      qty: 200,
      price: 1000000,
      type: "paid",
      eventid: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Regular",
      qty: 200,
      price: 100000,
      type: "paid",
      eventid: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VIP",
      qty: 100,
      price: 500000,
      type: "paid",
      eventid: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "VVIP",
      qty: 200,
      price: 1000000,
      type: "paid",
      eventid: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "ZOOM TICKET",
      qty: 500,
      price: 100000,
      type: "paid",
      eventid: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
