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
    await queryInterface.bulkInsert("accounts", [
      {
        username: "Chandra",
        email: "chandra@gmail.com",
        password: "12345678",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Jason",
        email: "jason@gmail.com",
        password: "12345678",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Nisfun",
        email: "nisfun@gmail.com",
        password: "12345678",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
