"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Transactions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.STRING,
            },
            bankAccountId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "BankAccounts",
                    },
                    key: "id",
                },
            },
            voucherId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Vouchers",
                    },
                    key: "id",
                },
            },
            nominalId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Nominals",
                    },
                    key: "id",
                },
            },
            tax: {
                type: Sequelize.STRING,
            },
            value: {
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
        await queryInterface.dropTable("Transactions");
    },
};
