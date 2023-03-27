'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        firstName: "Milhouse",
        lastName: "Van Houten",
        hashedPassword: bcrypt.hashSync('password'),
        birthday: "2012-01-01",
        displayPic: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/18/09/the-simpsons-milhouse.png?width=1200",
        theme: "cows",
        moolah: 600,
        activePet: 1,
        activeBg: 1
      },
      {
        email: 'amy@gmail.com',
        firstName: "Amy",
        lastName: "Dong",
        hashedPassword: bcrypt.hashSync('password'),
        birthday: "1992-01-06",
        displayPic: "https://images.pexels.com/photos/2173872/pexels-photo-2173872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        theme: "cows",
        moolah: 800,
        activePet: 2,
        activeBg: 2
      },
      {
        email: 'kevin@gmail.com',
        firstName: "Kevin",
        lastName: "Nguyen",
        hashedPassword: bcrypt.hashSync('password'),
        birthday: "1992-01-26",
        displayPic: "https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg",
        theme: "cows",
        moolah: 500,
        activePet: 3,
        activeBg: 3
      },
      {
        email: 'fahd@gmail.com',
        firstName: "Fahd",
        lastName: "Ahsan",
        hashedPassword: bcrypt.hashSync('password'),
        birthday: "1992-06-01",
        displayPic: "https://nationaltoday.com/wp-content/uploads/2022/10/36-Lionel-Messi.jpg",
        theme: "cows",
        moolah: 500,
        activePet: 4,
        activeBg: 4
      },
      {
        email: 'james@gmail.com',
        firstName: "James",
        lastName: "Duh",
        hashedPassword: bcrypt.hashSync('password'),
        birthday: "1995-03-01",
        displayPic: "https://robbreport.com/wp-content/uploads/2021/02/1-7.jpg?w=1000",
        theme: "cows",
        moolah: 500,
        activePet: 5,
        activeBg: 5
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});

  }
};
