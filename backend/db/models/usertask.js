'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserTask.belongsTo(
        models.User,
        {
          foreignKey: "userId"
        }
      );
    }

  }
  UserTask.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    day: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATEONLY
    },
    categoryName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    taskName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        name: "uniqueHabit",
        fields: [ "taskName", "taskType" ],
        where: {
          taskType: "Habit"
        }
      }
    },
    taskType: {
      allowNull: false,
      type: DataTypes.STRING
    },
    taskIcon: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isCompleted: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    pointsEarned: {
      allowNull: false,
      defaultValue: 5,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'UserTask',
  });
  return UserTask;
};
