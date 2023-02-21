'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Pets';

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

   return queryInterface.bulkInsert(options, [
    {
      name: "Moo-Moo",
      flavor: "Sesame",
      health: 100,
      friendliness: 12,
      petImageUrl: "https://keenlychung.com/images/cow_temp.png",
      userItemId: 1
    },
    {
      name: "Goat",
      flavor: "Sesame",
      health: 100,
      friendliness: 88,
      petImageUrl: "https://keenlychung.com/images/cow_temp.png",
      userItemId: 3
    },
    {
      name: "Austin",
      flavor: "Sesame",
      health: 100,
      friendliness: 100,
      petImageUrl: "https://keenlychung.com/images/cow_temp.png",
      userItemId: 5
    },
    {
      name: "Porsche",
      flavor: "Sesame",
      health: 100,
      friendliness: 37,
      petImageUrl: "https://keenlychung.com/images/cow_temp.png",
      userItemId: 7
    },
    {
      name: "Messi",
      flavor: "Sesame",
      health: 100,
      friendliness: 10,
      petImageUrl: "https://keenlychung.com/images/cow_temp.png",
      userItemId: 9
    },
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete(options, {}, {});
  }
};
