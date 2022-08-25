"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Vouchers", [
            {
                id: 1,
                categoryId: 2,
                name: "Clash of Clans",
                status: "active",
                thumbnail: "ini thumbnail Clash of Clans",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                categoryId: 1,
                name: "Age of Empires",
                status: "active",
                thumbnail: "ini thumbnail Clash of Clans",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                categoryId: 2,
                name: "Genshin Impact",
                status: "active",
                thumbnail: "ini thumbnail Clash of Clans",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Vouchers", null, {});
    },
};
