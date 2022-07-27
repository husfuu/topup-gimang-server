"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transactions extends Model {
        static associate(models) {
            // define association here
            this.belongsTo(models.Vouchers, {
                foreignKey: "voucherId",
            });

            this.belongsTo(models.Payments, {
                foreignKey: "paymentId",
            });
        }
    }
    Transactions.init(
        {
            userId: DataTypes.STRING,
            adminId: DataTypes.STRING,
            paymentId: DataTypes.STRING,
            voucherId: DataTypes.STRING,
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
