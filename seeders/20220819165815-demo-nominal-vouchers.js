"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        // await queryInterface.bulkInsert("NominalVouchers", [
        //     {
        //         voucherId: 1,
        //         nominalId: 1,
        //         createdAt: new Date(),
        //         updatedAt: new Date(),
        //     },
        //     {
        //         voucherId: 1,
        //         nominalId: 2,
        //         createdAt: new Date(),
        //         updatedAt: new Date(),
        //     },
        //     {
        //         voucherId: 1,
        //         nominalId: 3,
        //         createdAt: new Date(),
        //         updatedAt: new Date(),
        //     },
        //     {
        //         voucherId: 1,
        //         nominalId: 4,
        //         createdAt: new Date(),
        //         updatedAt: new Date(),
        //     },
        //     {
        //         voucherId: 2,
        //         nominalId: 1,
        //         createdAt: new Date(),
        //         updatedAt: new Date(),
        //     },
        //     {
        //         voucherId: 2,
        //         nominalId: 2,
        //         createdAt: new Date(),
        //         updatedAt: new Date(),
        //     },
        //     {
        //         voucherId: 2,
        //         nominalId: 3,
        //         createdAt: new Date(),
        //         updatedAt: new Date(),
        //     },
        //     {
        //         voucherId: 3,
        //         nominalId: 3,
        //         createdAt: new Date(),
        //         updatedAt: new Date(),
        //     },
        //     {
        //         voucherId: 3,
        //         nominalId: 4,
        //         createdAt: new Date(),
        //         updatedAt: new Date(),
        //     },
        // ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("NominalVouchers", null, {});
    },
};
