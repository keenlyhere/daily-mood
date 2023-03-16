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
    toDoCategoryOrder: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    habitCategoryOrder: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    toDoTaskOrder: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    habitTaskOrder: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'UserTask',
    hooks: {
      async beforeCreate(userTask) {
        const { taskType, categoryName } = userTask;

        const categoryOrderCol = taskType === "Habit" ? "habitCategoryOrder" : "toDoCategoryOrder";

        // find max category order for this categoryName in this taskType
        const maxCategoryOrder = await UserTask.max(categoryOrderCol, {
          where: {
            taskType
          }
        });

        // console.log("maxCategoryOrder ===> \n\n\n", maxCategoryOrder);

        // if no tasks in the category, then the order should start at 1
        if (!maxCategoryOrder) {
          if (taskType === "Habit") {
            userTask.habitTaskOrder = 1;
          } else {
            userTask.toDoTaskOrder = 1;
          }
        } else {
          if (taskType === "Habit") {
            userTask.habitCategoryOrder = maxCategoryOrder + 1;
          } else {
            userTask.toDoCategoryOrder = maxCategoryOrder + 1;
          }
        }

        const category = await UserTask.findOne({
          where: {
            taskType,
            categoryName
          }
        })

        // if category does not exist yet, increment the order by one
        if (!category) {
          userTask[categoryOrderCol] = maxCategoryOrder + 1;
        } else {
          userTask[categoryOrderCol] = category[categoryOrderCol];
        }

        const lastTaskInCategory = await UserTask.findOne({
          where: {
            taskType,
            categoryName
          },
          order: [
            [
              taskType === "Habit" ? "habitTaskOrder" : "toDoTaskOrder", "DESC"
            ]
          ]
        });

        // if a task in that category exists already
        if (lastTaskInCategory) {
          userTask[taskType === "Habit" ? "habitTaskOrder" : "toDoTaskOrder"] = lastTaskInCategory[taskType === "Habit" ? "habitTaskOrder" : "toDoTaskOrder"] + 1;
        } else {
          // if there are no tasks in this category yet, then it should be ordered first
          userTask[taskType === "Habit" ? "habitTaskOrder" : "toDoTaskOrder"] = 1;
        }
      }
    }
  });
  return UserTask;
};
