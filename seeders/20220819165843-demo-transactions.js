"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Transactions", [
            {
                id: 1,
                userId: "12312vsasa1",
                bankAccountId: 1,
                voucherId: 1,
                nominalId: 1,
                tax: "0.1",
                value: "50000",
                status: "pending",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                userId: "12312vsasa1",
                bankAccountId: 1,
                voucherId: 1,
                nominalId: 2,
                tax: "0.1",
                value: "70000",
                status: "pending",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Transactions", null, {});
    },
};
