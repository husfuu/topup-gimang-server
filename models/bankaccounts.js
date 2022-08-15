"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class BankAccounts extends Model {
        static associate(models) {
            this.belongsTo(models.Admins, {
                foreignKey: "adminId",
            });
            this.belongsTo(models.Payments, {
                foreignKey: "paymentId",
                as: "payment",
            });
            this.hasMany(models.Transactions, {
                foreignKey: "bankAccountId",
            });
            // this.hasMany(models.Payments, {
            //     foreignKey: "bankAccountId",
            // });
        }
    }
    BankAccounts.init(
        {
            adminId: DataTypes.STRING,
            name: DataTypes.STRING,
            accountNumber: DataTypes.STRING,
            paymentId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "BankAccounts",
        },
    );
    return BankAccounts;
};
