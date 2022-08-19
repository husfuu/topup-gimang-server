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
        await queryInterface.bulkInsert("NominalVouchers", [
            {
                voucherId: 1,
                nominalId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                voucherId: 1,
                nominalId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                voucherId: 1,
                nominalId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                voucherId: 1,
                nominalId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                voucherId: 2,
                nominalId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                voucherId: 2,
                nominalId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                voucherId: 2,
                nominalId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                voucherId: 3,
                nominalId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                voucherId: 3,
                nominalId: 4,
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
        await queryInterface.bulkDelete("NominalVouchers", null, {});
    },
};
