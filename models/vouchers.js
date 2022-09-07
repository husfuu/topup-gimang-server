"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Vouchers extends Model {
        static associate(models) {
            this.hasMany(models.NominalVouchers, {
                foreignKey: "voucherId",
                as: "voucher",
            });

            this.belongsToMany(models.Nominals, {
                foreignKey: "voucherId",
                through: models.NominalVouchers,
            });

            this.belongsTo(models.Categories, {
                foreignKey: "categoryId",
            });

            this.hasMany(models.Transactions, {
                foreignKey: "voucherId",
            });
        }
    }
    Vouchers.init(
        {
            categoryId: DataTypes.STRING,
            name: DataTypes.STRING,
            status: DataTypes.STRING,
            thumbnail: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Vouchers",
        },
    );
    return Vouchers;
};
