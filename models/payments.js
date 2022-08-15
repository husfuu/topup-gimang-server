"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Payments extends Model {
        static associate(models) {
            this.hasMany(models.BankAccounts, {
                foreignKey: "paymentId",
            });
            // this.hasMany(models.Transactions, {
            //     foreignKey: "paymentId",
            // });
        }
    }
    Payments.init(
        {
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
