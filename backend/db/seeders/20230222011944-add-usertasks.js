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
      taskIcon: "https://cdn.icon-icons.com/icons2/3675/PNG/512/faity_dumbbell_gym_sportswear_athlete_sport_hehy_workout_fitness_icon_228905.png",
      isCompleted: true,
      pointsEarned: 1
    },
    {
      userId: 1,
      day: "2023-02-18",
      categoryName: "Dailies",
      taskName: "Breakfast",
      taskType: "Habit",
      taskIcon: "https://cdn.icon-icons.com/icons2/3384/PNG/512/turkey_chicken_breakfast_egg_fried_icon_212590.png",
      isCompleted: true,
      pointsEarned: 1
    },
    {
      userId: 1,
      day: "2023-02-18",
      categoryName: "Dailies",
      taskName: "Lunch",
      taskType: "Habit",
      taskIcon: "https://cdn.icon-icons.com/icons2/3356/PNG/512/eat_egg_symbol_emoj_food_dish_lunch_rice_curry_icon_210583.png",
      isCompleted: true,
      pointsEarned: 1
    },
    {
      userId: 1,
      day: "2023-02-18",
      categoryName: "Dailies",
      taskName: "Dinner",
      taskType: "Habit",
      taskIcon: "https://cdn.icon-icons.com/icons2/3384/PNG/512/meal_lunch_dinner_eat_food_noodle_icon_212595.png",
      isCompleted: true,
      pointsEarned: 1
    },
    {
      userId: 1,
      day: "2023-02-18",
      categoryName: "To-Do",
      taskName: "Groceries",
      taskType: "To-Do",
      taskIcon: "https://cdn.icon-icons.com/icons2/3560/PNG/512/grocery_bag_shopping_bag_marketplace_icon_225198.png",
      isCompleted: true,
      pointsEarned: 1
    },
    {
      userId: 1,
      day: "2023-02-18",
      categoryName: "To-Do",
      taskName: "Taxes",
      taskType: "To-Do",
      taskIcon: "https://cdn.icon-icons.com/icons2/3560/PNG/512/grocery_bag_shopping_bag_marketplace_icon_225198.png",
      isCompleted: false,
      pointsEarned: 0
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
