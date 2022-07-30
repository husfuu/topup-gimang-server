"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Admins extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define associat.ion here
            this.hasOne(models.BankAccounts, {
                foreignKey: "adminId",
                uniqueKey: "adminId",
            });
        }
    }
    Admins.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Admins",
        },
    );
    return Admins;
};
