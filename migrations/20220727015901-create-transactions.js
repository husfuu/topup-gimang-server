"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Transactions", {
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.literal("uuid_generate_v4()"),
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: Sequelize.UUID,
            },
            bankAccountId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: "BankAccounts",
                    },
                    key: "id",
                },
            },
            voucherId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: "Vouchers",
                    },
                    key: "id",
                },
            },
            nominalId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: "Nominals",
                    },
                    key: "id",
                },
            },
            categoryId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: "Categories",
                    },
                    key: "id",
                },
            },
            verifyId: {
                type: Sequelize.STRING,
            },
            accountSenderName: {
                type: Sequelize.STRING,
            },
            tax: {
                type: Sequelize.STRING,
            },
            value: {
                type: Sequelize.REAL,
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
        await queryInterface.dropTable("Transactions");
    },
};
