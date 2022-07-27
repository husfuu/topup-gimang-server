"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Payments extends Model {
        static associate(models) {
            this.belongsTo(models.BankAccounts, {
                foreignKey: "bankAccountId",
                as: "bankAccount",
            });
            this.hasMany(models.Transactions, {
                foreignKey: "paymentId",
            });
        }
    }
    Payments.init(
        {
            bankAccountId: DataTypes.STRING,
            type: DataTypes.STRING,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Payments",
        },
    );
    return Payments;
};
