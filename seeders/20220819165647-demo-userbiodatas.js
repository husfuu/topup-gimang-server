"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert("Userbiodatas", [
            {
                id: 1,
                userId: "12312vsasa1",
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
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Userbiodatas", null, {});
    },
};
