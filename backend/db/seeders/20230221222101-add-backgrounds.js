'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Backgrounds';

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
      bgName: "Castle",
      bgImageUrl: "https://keenlychung.com/dailymood/backgrounds/bg_castle.PNG",
      userItemId: 2
    },
    {
      bgName: "Farm",
      bgImageUrl: "https://keenlychung.com/dailymood/backgrounds/bg_default.PNG",
      userItemId: 4
    },
    {
      bgName: "Farm",
      bgImageUrl: "https://keenlychung.com/dailymood/backgrounds/bg_default.PNG",
      userItemId: 6
    },
    {
      bgName: "Farm",
      bgImageUrl: "https://keenlychung.com/dailymood/backgrounds/bg_default.PNG",
      userItemId: 8
    },
    {
      bgName: "Farm",
      bgImageUrl: "https://keenlychung.com/dailymood/backgrounds/bg_default.PNG",
      userItemId: 10
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
