'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Pet.belongsTo(
        models.UserItem,
        {
          foreignKey: "userItemId",
        }
      );

    }
  }
  Pet.init({
    name: {
      allowNull: false,
      defaultValue: "Moo-Moo",
      type: DataTypes.STRING
    },
    flavor: {
      allowNull: false,
      defaultValue: "Sesame",
      type: DataTypes.STRING
    },
    health: {
      allowNull: false,
      defaultValue: 100,
      type: DataTypes.INTEGER
    },
    friendliness: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    petImageUrl: {
      allowNull: false,
      defaultValue: "https://keenlychung.com/dailymood/cows/cow_sesame_normal.PNG",
      type: DataTypes.STRING
    },
    userItemId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};
