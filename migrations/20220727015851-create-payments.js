"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Payments", {
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.literal("uuid_generate_v4()"),
                primaryKey: true,
                allowNull: false,
            },
            // bankAccountId: {
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: {
            //             tableName: "BankAccounts",
            //         },
            //         key: "id",
            //     },
            // },
            type: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("Payments");
    },
};
