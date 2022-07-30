"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("BankAccounts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            adminId: {
                type: Sequelize.INTEGER,
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
