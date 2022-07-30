"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class BankAccounts extends Model {
        static associate(models) {
            this.belongsTo(models.Admins, {
                foreignKey: "adminId",
            });

            this.hasMany(models.Payments, {
                foreignKey: "bankAccountId",
            });
        }
    }
    BankAccounts.init(
        {
            adminId: DataTypes.STRING,
            name: DataTypes.STRING,
            accountNumber: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "BankAccounts",
        },
    );
    return BankAccounts;
};
