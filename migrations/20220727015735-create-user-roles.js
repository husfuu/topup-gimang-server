"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("UserRoles", {
            userId: {
                type: Sequelize.STRING,
            },
            roleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Roles",
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
        await queryInterface.dropTable("UserRoles");
    },
};
