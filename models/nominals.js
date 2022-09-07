"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Nominals extends Model {
        static associate(models) {
            this.hasMany(models.NominalVouchers, {
                foreignKey: "nominalId",
                as: "nominal",
            });

            this.belongsToMany(models.Vouchers, {
                foreignKey: "nominalId",
                through: models.NominalVouchers,
            });

            this.hasMany(models.Transactions, {
                foreignKey: "nominalId",
            });
        }
    }
    Nominals.init(
        {
            coinName: DataTypes.STRING,
            coinQuantity: DataTypes.INTEGER,
            price: DataTypes.REAL,
        },
        {
            sequelize,
            modelName: "Nominals",
        },
    );
    return Nominals;
};
