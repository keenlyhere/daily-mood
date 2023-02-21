'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      UserItem.belongsTo(
        models.User,
        {
          foreignKey: "userId"
        }
      );

      UserItem.hasMany(
        models.Pet,
        {
          foreignKey: "userItemId",
          onDelete: "CASCADE",
          hooks: true
        }
      );

      UserItem.hasMany(
        models.Background,
        {
          foreignKey: "userItemId",
          onDelete: "CASCADE",
          hooks: true
        }
      );

    }
  }
  UserItem.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    itemType: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'UserItem',
  });
  return UserItem;
};
