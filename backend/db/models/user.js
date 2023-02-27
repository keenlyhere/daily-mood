'use strict';

const bcrypt = require('bcryptjs');

const {  Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    toSafeObject() {
      const { id, email, firstName, lastName, birthday, displayPic, theme, moolah, activePet, activeBg, lastLogin, pointsEarnedToday, pointsEarnedDailies } = this;
      return { id, email, firstName, lastName, birthday, displayPic, theme, moolah, activePet, activeBg, lastLogin, pointsEarnedToday, pointsEarnedDailies };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          email: credential
        }
      });
      if (user && user.validatePassword(password)) {
        console.log("User model - login:", user)
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ email, password, firstName, lastName, birthday, displayPic }) {
      const hashedPassword = bcrypt.hashSync(password);

      const user = await User.create({
        email,
        hashedPassword,
        firstName,
        lastName,
        birthday,
        displayPic
      });

      console.log("User model - new user:", user);

      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // define association here

      User.hasMany(
        models.UserItem,
        {
          foreignKey: "userId",
          onDelete: "CASCADE",
          hooks: true
        }
      );

      User.hasMany(
        models.DayEntry,
        {
          foreignKey: "userId",
          onDelete: "CASCADE",
          hooks: true
        }
      );

      User.hasMany(
        models.UserTask,
        {
          foreignKey: "userId",
          onDelete: "CASCADE",
          hooks: true
        }
      );

    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    birthday: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      unique: true
    },
    displayPic: {
      defaultValue: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      type: DataTypes.STRING,
    },
    theme: {
      allowNull: false,
      defaultValue: "cows",
      type: DataTypes.STRING,
    },
    moolah: {
      allowNull: false,
      defaultValue: 15,
      type: DataTypes.INTEGER
    },
    activePet: {
      // allowNull: false,
      type: DataTypes.INTEGER
    },
    activeBg: {
      // allowNull: false,
      type: DataTypes.INTEGER
    },
    lastLogin: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATEONLY
    },
    pointsEarnedToday: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    pointsEarnedDailies: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'updatedAt', 'email', 'createdAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword', 'createdAt', 'updatedAt']
        }
      },
      loginUser: {
        attributes: {}
      },
    }
  });
  return User;
};
