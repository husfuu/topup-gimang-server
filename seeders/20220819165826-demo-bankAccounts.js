"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("BankAccounts", [
            {
                id: 1,
                adminId: 1,
                name: "BNI",
                accountNumber: "123712gjas",
                paymentId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                adminId: 2,
                name: "BRI",
                accountNumber: "123712gjas",
                paymentId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("BankAccounts", null, {});
    },
};
