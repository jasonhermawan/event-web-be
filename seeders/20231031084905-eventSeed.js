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
   await queryInterface.bulkInsert('events', [
    {
    name: "Mukbang ramen",
    idpromotor: 1,
    date: "2023-01-01",
    time: "10:00",
    price: 100000,
    location: "Gedung Kantor",
    banner: "Ini Banner",
    idformat: 1,
    idtopic: 1,
    description: "Ini Description",
    idcategory: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    name: "Mukbang indomie",
    idpromotor: 1,
    date: "2023-01-01",
    time: "10:00",
    price: 100000,
    location: "Gedung Kantor",
    banner: "Ini Banner",
    idformat: 1,
    idtopic: 1,
    description: "Ini Description",
    idcategory: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    name: "Mukbang sate",
    idpromotor: 1,
    date: "2023-01-01",
    time: "10:00",
    price: 100000,
    location: "Gedung Kantor",
    banner: "Ini Banner",
    idformat: 1,
    idtopic: 1,
    description: "Ini Description",
    idcategory: 1,
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
