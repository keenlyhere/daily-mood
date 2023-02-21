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
      const { id, email, firstName, lastName, birthday, displayPic, theme, moolah, activePet, activeBg } = this;
      return { id, email, firstName, lastName, birthday, displayPic, theme, moolah, activePet, activeBg };
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

      // comment in once schema is approved and pet, background, and useritem tables are created

      // add the pet and background into UserItems
      // const petUserItem = UserItem.create({
      //   userId: user.id,
      //   itemType: "pet"
      // })

      // const bgUserItem = UserItem.create({
      //   userId: user.id,
      //   itemType: "background"
      // })

      // create default pet
      // note to self: (remove later) - pet will have default values so can just create a new pet on user creation
      // const pet = await Pet.create({
      //   userItemId: petUserItem.id
      // })

      // create default background
      // const bg = await Background.create({
      //   userItemId: bgUserItem.id
      // })

      user.activePet = pet.id;
      user.activeBg = bg.id;

      await user.save();

      // await pet.setUserItem(petUserItem);
      // await bg.setUserItem(bgUserItem);

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
