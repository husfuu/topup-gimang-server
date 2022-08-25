"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Nominals", [
            {
                id: 1,
                coinName: "Silver",
                coinQuantity: "10",
                price: "10000",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                coinName: "Silver",
                coinQuantity: "20",
                price: "20000",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                coinName: "Gold",
                coinQuantity: "10",
                price: "30000",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                coinName: "Gold",
                coinQuantity: "20",
                price: "40000",
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
        await queryInterface.bulkDelete("Nominals", null, {});
    },
};
