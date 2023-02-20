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

    options.tableName = "Users";
    await queryInterface.addColumn(options, "firstName", {
      allowNull: false,
      type: Sequelize.STRING(30)
    });

    await queryInterface.addColumn(options, "lastName", {
      allowNull: false,
      type: Sequelize.STRING(30)
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    options.tableName = "Users";
    await queryInterface.removeColumn(options, "firstName");
    await queryInterface.removeColumn(options, "lastName");

  }
};
