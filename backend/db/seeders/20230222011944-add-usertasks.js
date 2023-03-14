'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'UserTasks';

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
      categoryName: "Dailies",
      taskName: "Work out",
      taskType: "Habit",
      taskIcon: "https://keenlychung.com/dailymood/01.png",
      isCompleted: true,
      pointsEarned: 1,
      toDoCategoryOrder: 1,
      habitCategoryOrder: 1,
      toDoTaskOrder: 1,
      habitTaskOrder: 1,
    },
    {
      userId: 1,
      day: "2023-02-18",
      categoryName: "Dailies",
      taskName: "Breakfast",
      taskType: "Habit",
      taskIcon: "https://keenlychung.com/dailymood/02.png",
      isCompleted: true,
      pointsEarned: 1,
      toDoCategoryOrder: 1,
      habitCategoryOrder: 1,
      toDoTaskOrder: 1,
      habitTaskOrder: 2,
    },
    {
      userId: 1,
      day: "2023-02-18",
      categoryName: "Dailies",
      taskName: "Lunch",
      taskType: "Habit",
      taskIcon: "https://keenlychung.com/dailymood/03.png",
      isCompleted: true,
      pointsEarned: 1,
      toDoCategoryOrder: 1,
      habitCategoryOrder: 1,
      toDoTaskOrder: 1,
      habitTaskOrder: 3,
    },
    {
      userId: 1,
      day: "2023-02-18",
      categoryName: "Dailies",
      taskName: "Dinner",
      taskType: "Habit",
      taskIcon: "https://keenlychung.com/dailymood/04.png",
      isCompleted: true,
      pointsEarned: 1,
      toDoCategoryOrder: 1,
      habitCategoryOrder: 1,
      toDoTaskOrder: 1,
      habitTaskOrder: 4,
    },
    {
      userId: 1,
      day: "2023-02-18",
      categoryName: "To-Do",
      taskName: "Groceries",
      taskType: "To-Do",
      taskIcon: "https://keenlychung.com/dailymood/05.png",
      isCompleted: true,
      pointsEarned: 1,
      toDoCategoryOrder: 1,
      habitCategoryOrder: 1,
      toDoTaskOrder: 1,
      habitTaskOrder: 1,
    },
    {
      userId: 1,
      day: "2023-02-18",
      categoryName: "To-Do",
      taskName: "Taxes",
      taskType: "To-Do",
      taskIcon: "https://keenlychung.com/dailymood/06.png",
      isCompleted: false,
      pointsEarned: 0,
      toDoCategoryOrder: 1,
      habitCategoryOrder: 1,
      toDoTaskOrder: 2,
      habitTaskOrder: 1,
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
