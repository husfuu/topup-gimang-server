"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("BankAccounts", {
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.literal("uuid_generate_v4()"),
                primaryKey: true,
                allowNull: false,
            },
            adminId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: "Admins",
                    },
                    key: "id",
                },
            },
            name: {
                type: Sequelize.STRING,
            },
            accountNumber: {
                type: Sequelize.STRING,
            },
            paymentId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: "Payments",
                    },
                    key: "id",
                },
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
        await queryInterface.dropTable("BankAccounts");
    },
};
