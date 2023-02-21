'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  // define your schema in options object
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      flavor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      health: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      friendliness: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      petImageUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userItemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'UserItems'
        }
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        type: Sequelize.DATE
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Pets"
    await queryInterface.dropTable(options);
  }
};
