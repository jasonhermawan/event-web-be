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
    name: "STEVE AOKI'S CAKE PARTY",
    accountid: 1,
    startDate: "2023-12-10",
    endDate: "2023-12-10",
    startTime: "17:00",
    endTime: "23:00",
    price: 700000,
    cityid: 2,
    location: "Phantom PIK 2",
    banner: "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20231114103230_6552ea4e55d52.jpg",
    formatid: 1,
    topicid: 2,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    name: "Neopolis Live Stage @ Neopolis Run",
    accountid: 2,
    startDate: "2023-12-03",
    endDate: "2023-12-03",
    startTime: "08:00",
    endTime: "11:00",
    price: 100000,
    cityid: 2,
    location: "Emerald Neopolis",
    banner: "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20231114181505_655356b9ea6b0.jpg",
    formatid: 1,
    topicid: 2,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    name: "Sidney Mohede - Life Is A Dance Tour Yogyakarta",
    accountid: 3,
    startDate: "2023-11-24",
    endDate: "2023-11-24",
    startTime: "18:00",
    endTime: "22:00",
    price: 100000,
    cityid: 5,
    location: "Sleman City Hall",
    banner: "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20231027105941_653b35ad41e34.jpg",
    formatid: 1,
    topicid: 2,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    name: "PERAN DAN KEWENANGAN NOTARIS DALAM PEMBUATAN AKTA IKRAR WAKAF",
    accountid: 5,
    startDate: "2023-12-02",
    endDate: "2023-12-05",
    startTime: "10:00",
    endTime: "12:00",
    price: 100000,
    cityid: 6,
    location: "Online",
    banner: "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20231124110415_656020bf54641.jpg",
    formatid: 2,
    topicid:3,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
