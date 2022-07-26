'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NominalVouchers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Nominals, {
        foreignKey: 'nominalId',
        as: 'nominal'
      })
      
      this.belongsTo(models.Vouchers, {
        foreignKey: 'voucherId',
        as: 'voucher'
      })
    }
  }
  NominalVouchers.init({
    voucherId: DataTypes.STRING,
    nominalId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NominalVouchers',
  });
  return NominalVouchers;
};