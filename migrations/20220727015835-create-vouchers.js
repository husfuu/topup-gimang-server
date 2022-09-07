"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Vouchers", {
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.literal("uuid_generate_v4()"),
                primaryKey: true,
                allowNull: false,
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
            name: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.STRING,
            },
            thumbnail: {
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
        await queryInterface.dropTable("Vouchers");
    },
};
