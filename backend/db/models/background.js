'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Background extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Background.belongsTo(
        models.UserItem,
        {
          foreignKey: "userItemId",
        }
      );

    }
  }
  Background.init({
    bgName: {
      allowNull: false,
      defaultValue: "Farm",
      type: DataTypes.STRING
    },
    bgImageUrl: {
      allowNull: false,
      defaultValue: "https://keenlychung.com/images/farm_temp.png",
      type: DataTypes.STRING
    },
    userItemId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Background',
  });
  return Background;
};
