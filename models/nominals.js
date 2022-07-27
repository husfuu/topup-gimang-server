"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Nominals extends Model {
        static associate(models) {
            // define association here
            this.hasMany(models.NominalVouchers, {
                foreignKey: "nominalId",
                as: "nominal",
            });

            this.belongsToMany(models.Vouchers, {
                foreignKey: "nominalId",
                through: models.NominalVouchers,
            });
        }
    }
    Nominals.init(
        {
            coinName: DataTypes.STRING,
            coinQuantity: DataTypes.STRING,
            price: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Nominals",
        },
    );
    return Nominals;
};
