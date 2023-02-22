'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'DayEntries';

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
      day: "2023-02-18",
      entryType: "dayMood",
      entryData: "Meh",
    },
    {
      userId: 1,
      day: "2023-02-18",
      entryType: "dayImage",
      entryData: "https://images.pexels.com/photos/3910073/pexels-photo-3910073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      userId: 1,
      day: "2023-02-18",
      entryType: "dayJournal",
      entryData: "I didn't have the greatest day today, but it wasn't completely bad.",
    },
    {
      userId: 1,
      day: "2023-02-19",
      entryType: "dayMood",
      entryData: "Sad",
    },
    {
      userId: 1,
      day: "2023-02-19",
      entryType: "dayImage",
      entryData: "https://images.pexels.com/photos/2228580/pexels-photo-2228580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      userId: 1,
      day: "2023-02-19",
      entryType: "dayJournal",
      entryData: "Today was terrible for me. Nothing was going right. Hopefully tomorrow will be better.",
    },
    {
      userId: 1,
      day: "2023-02-20",
      entryType: "dayMood",
      entryData: "Ecstatic",
    },
    {
      userId: 1,
      day: "2023-02-20",
      entryType: "dayImage",
      entryData: "https://images.pexels.com/photos/4301252/pexels-photo-4301252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      userId: 1,
      day: "2023-02-20",
      entryType: "dayJournal",
      entryData: "I feel so much better today! I finally got a chance to take my camera outside to explore nature and capture the beauty of it.",
    },
    {
      userId: 2,
      day: "2023-02-21",
      entryType: "dayMood",
      entryData: "Ecstatic",
    },
    {
      userId: 2,
      day: "2023-02-21",
      entryType: "dayImage",
      entryData: "https://keenlychung.com/images/amy_ace.png",
    },
    {
      userId: 2,
      day: "2023-02-21",
      entryType: "dayJournal",
      entryData: "I got another ace while playing comp today! GGEZ.",
    },
   ], {})
    // .then(() => {
    //   console.log('Pet seed data inserted successfully!');
    // })
    // .catch(error => {
    //   console.error(error);
    // });
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
