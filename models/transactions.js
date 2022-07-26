'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Vouchers, {
        foreignKey: 'voucherId'
      })
      
      this.belongsTo(models.Payments, {
        foreignKey: 'paymentId'
      })
    }
  }
  Transactions.init({
    userId: DataTypes.STRING,
    adminId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    voucherId: DataTypes.STRING,
    nominalId: DataTypes.STRING,
    tax: DataTypes.STRING,
    value: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};