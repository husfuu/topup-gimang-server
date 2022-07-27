"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("NominalVouchers", {
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
        await queryInterface.dropTable("NominalVouchers");
    },
};
