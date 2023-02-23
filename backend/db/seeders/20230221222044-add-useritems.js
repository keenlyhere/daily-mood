'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'UserItems';

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
      userId: 1,
      itemType: "pet",
    },
    {
      userId: 1,
      itemType: "background",
    },
    {
      userId: 2,
      itemType: "pet",
    },
    {
      userId: 2,
      itemType: "background",
    },
    {
      userId: 3,
      itemType: "pet",
    },
    {
      userId: 3,
      itemType: "background",
    },
    {
      userId: 4,
      itemType: "pet",
    },
    {
      userId: 4,
      itemType: "background",
    },
    {
      userId: 5,
      itemType: "pet",
    },
    {
      userId: 5,
      itemType: "background",
    },
   ], {})
   .then(() => {
      console.log('Pet seed data inserted successfully!');
    })
    .catch(error => {
      console.error(error);
    });
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
