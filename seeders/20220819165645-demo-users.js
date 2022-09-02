"use strict";
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Users", [
            {
                id: "27b06a77-0bff-40f0-a2dc-80099ab32047",
                email: "husni@gmail.com",
                password: bcrypt.hashSync("husniPass", salt),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "46a30afa-7513-4855-9e16-1e87c2ff6002",
                email: "husni1@gmail.com",
                password: bcrypt.hashSync("husniPass", salt),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
