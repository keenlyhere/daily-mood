'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DayEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DayEntry.belongsTo(
        models.User,
        {
          foreignKey: "userId"
        }
      );
    }

  }
  DayEntry.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    day: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATEONLY,
      unique: true
    },
    entryType: {
      allowNull: false,
      type: DataTypes.STRING
    },
    entryData: {
      allowNull: false,
      type: DataTypes.STRING
    },
    pointsEarned: {
      allowNull: false,
      defaultValue: 5,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'DayEntry',
  });
  return DayEntry;
};
