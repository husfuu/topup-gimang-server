"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Nominals", {
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.literal("uuid_generate_v4()"),
                primaryKey: true,
                allowNull: false,
            },
            coinName: {
                type: Sequelize.STRING,
            },
            coinQuantity: {
                type: Sequelize.INTEGER,
            },
            price: {
                type: Sequelize.REAL,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Nominals");
    },
};
