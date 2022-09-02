"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Transactions", [
            {
                userId: "27b06a77-0bff-40f0-a2dc-80099ab32047",
                bankAccountId: 1,
                voucherId: 1,
                nominalId: 1,
                tax: 0.1,
                value: 50000,
                status: "pending",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: "27b06a77-0bff-40f0-a2dc-80099ab32047",
                bankAccountId: 1,
                voucherId: 2,
                nominalId: 2,
                tax: 0.1,
                value: 70000,
                status: "pending",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: "27b06a77-0bff-40f0-a2dc-80099ab32047",
                bankAccountId: 1,
                voucherId: 3,
                nominalId: 2,
                tax: 0.1,
                value: 70000,
                status: "pending",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: "27b06a77-0bff-40f0-a2dc-80099ab32047",
                bankAccountId: 1,
                voucherId: 4,
                nominalId: 2,
                tax: 0.1,
                value: 70000,
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
