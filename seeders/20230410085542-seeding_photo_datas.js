"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Photos",
      [
        {
          title: "foto ke 1",
          caption: "ini foto ke 1",
          image_url: "https://fotoke1.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "foto ke 2",
          caption: "ini foto ke 2",
          image_url: "https://fotoke2.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "foto ke 3",
          caption: "ini foto ke 3",
          image_url: "https://fotoke3.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "foto ke 4",
          caption: "ini foto ke 4",
          image_url: "https://fotoke4.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
