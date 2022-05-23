"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          title: "Negri 5 Menara",
          author: "Ahmad Fuadi",
          image: "/uploads/image 1.jpg",
          publish: new Date(),
          price: 90,
          stock: 200,
          user: 1,
          category: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Laskar Pelangi",
          author: "Andrea Hirata",
          image: "/uploads/image 2.jpg",
          publish: new Date(),
          price: 90,
          stock: 200,
          user: 1,
          category: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Api Sejarah Jilid 1",
          author: "Ahmad Mansur Suryanegara",
          image: "/uploads/image 3.jpg",
          publish: new Date(),
          price: 90,
          stock: 200,
          user: 1,
          category: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
