'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  // define your schema in options object
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    options.tableName = "UserTasks";
    await queryInterface.addColumn(options, "toDoCategoryOrder", {
      type: Sequelize.INTEGER
    }, options)

    options.tableName = "UserTasks";
    await queryInterface.addColumn(options, "habitCategoryOrder", {
      type: Sequelize.INTEGER
    }, options)

    options.tableName = "UserTasks";
    await queryInterface.addColumn(options, "toDoTaskOrder", {
      type: Sequelize.INTEGER
    }, options)

    options.tableName = "UserTasks";
    await queryInterface.addColumn(options, "habitTaskOrder", {
      type: Sequelize.INTEGER
    }, options)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    options.tableName = "UserTasks";
    await queryInterface.removeColumn(options, "toDoCategoryOrder");
    await queryInterface.removeColumn(options, "habitCategoryOrder");
    await queryInterface.removeColumn(options, "toDoTaskOrder");
    await queryInterface.removeColumn(options, "habitTaskOrder");

  }
};
