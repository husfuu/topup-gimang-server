"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Userbiodatas", [
            {
                id: 1,
                userId: "46a30afa-7513-4855-9e16-1e87c2ff6002",
                username: "husfuu",
                fullName: "M. Husni Nur Fadillah",
                phoneNumber: "087744417665",
                gender: "male",
                address: "pagatan",
                avatar: "12t71ei2he37t1y39101",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Userbiodatas", null, {});
    },
};
