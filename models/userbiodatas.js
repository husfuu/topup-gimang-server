"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Userbiodatas extends Model {
        static associate(models) {
            this.belongsTo(models.Users, {
                foreignKey: "userId",
            });
        }
    }
    Userbiodatas.init(
        {
            userId: DataTypes.STRING,
            username: DataTypes.STRING,
            fullName: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            gender: DataTypes.STRING,
            address: DataTypes.STRING,
            avatar: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Userbiodatas",
        },
    );
    return Userbiodatas;
};
