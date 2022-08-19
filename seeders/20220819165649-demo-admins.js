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
        await queryInterface.bulkInsert("Admins", [
            {
                id: 1,
                fullName: "M. Husni Nur Fadillah",
                email: "husfuudev@gmail.com",
                password: "husniPass",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                fullName: "Rifaa Dhiyaa Zahroo",
                email: "caramewln@gmail.com",
                password: "rifaaPass",
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
    },
};
