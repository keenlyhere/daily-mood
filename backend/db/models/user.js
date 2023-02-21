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
      const { id, firstName, lastName, username, email, profileImageUrl } = this;
      return { id, firstName, lastName, username, email, profileImageUrl };
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
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        console.log("User model - login:", user)
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ username, email, password, firstName, lastName, profileImageUrl }) {
      const hashedPassword = bcrypt.hashSync(password);

      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName,
        profileImageUrl
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // define association here
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
      type: DataTypes.STRING,
      get() {
        if (!this.getDataValue("displayPic"))
          return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        return this.getDataValue("displayPic")
      }
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false
    },
    moolah: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    activePet: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    activeBg: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
