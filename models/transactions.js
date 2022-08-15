"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transactions extends Model {
        static associate(models) {
            // define association here
            this.belongsTo(models.Vouchers, {
                foreignKey: "voucherId",
            });

            this.belongsTo(models.BankAccounts, {
                foreignKey: "bankAccountId",
            });

            this.belongsTo(models.Nominals, {
                foreignKey: "nominalId",
            });
        }
    }
    Transactions.init(
        {
            userId: DataTypes.STRING,
            bankAccountId: DataTypes.INTEGER,
            voucherId: DataTypes.INTEGER,
            nominalId: DataTypes.INTEGER,
            tax: DataTypes.STRING,
            value: DataTypes.STRING,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Transactions",
        },
    );
    return Transactions;
};
