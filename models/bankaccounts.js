"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class BankAccounts extends Model {
        static associate(models) {
            this.hasMany(models.Payments, {
                foreignKey: "bankAccountId",
            });
        }
    }
    BankAccounts.init(
        {
            userId: DataTypes.STRING,
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
