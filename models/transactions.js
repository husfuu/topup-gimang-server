"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transactions extends Model {
        static associate(models) {
            this.belongsTo(models.Vouchers, {
                foreignKey: "voucherId",
            });

            this.belongsTo(models.BankAccounts, {
                foreignKey: "bankAccountId",
            });

            this.belongsTo(models.Nominals, {
                foreignKey: "nominalId",
            });

            this.belongsTo(models.Categories, {
                foreignKey: "categoryId",
            });
        }
    }
    Transactions.init(
        {
            userId: DataTypes.STRING,
            bankAccountId: DataTypes.STRING,
            voucherId: DataTypes.STRING,
            nominalId: DataTypes.STRING,
            categoryId: DataTypes.STRING,
            verifyId: DataTypes.STRING,
            accountSenderName: DataTypes.STRING,
            tax: DataTypes.STRING,
            value: DataTypes.REAL,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Transactions",
        },
    );
    return Transactions;
};
