"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Userbiodatas extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
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
