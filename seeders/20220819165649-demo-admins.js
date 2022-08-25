"use strict";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Admins", [
            {
                id: 1,
                fullName: "M. Husni Nur Fadillah",
                email: "husfuudev@gmail.com",
                password: bcrypt.hashSync("husniPass", salt),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                fullName: "Rifaa Dhiyaa Zahroo",
                email: "caramewln@gmail.com",
                password: bcrypt.hashSync("rifaaPass", salt),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Admins", null, {});
    },
};
