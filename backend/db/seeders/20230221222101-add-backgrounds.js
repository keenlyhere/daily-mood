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
      bgName: "Farm",
      bgImageUrl: "https://keenlychung.com/images/farm_temp.png",
      userItemId: 2
    },
    {
      bgName: "Farm",
      bgImageUrl: "https://keenlychung.com/images/farm_temp.png",
      userItemId: 4
    },
    {
      bgName: "Farm",
      bgImageUrl: "https://keenlychung.com/images/farm_temp.png",
      userItemId: 6
    },
    {
      bgName: "Farm",
      bgImageUrl: "https://keenlychung.com/images/farm_temp.png",
      userItemId: 8
    },
    {
      bgName: "Farm",
      bgImageUrl: "https://keenlychung.com/images/farm_temp.png",
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
