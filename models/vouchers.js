'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vouchers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.NominalVouchers, {
        foreignKey: 'voucherId',
        as: 'voucher'
      })
      
      this.belongsToMany(models.Nominals, {
        foreignKey: 'voucherId',
        through: models.NominalVouchers
      })

      this.belongsTo(models.Categories, {
        foreignKey: "categoryId",
      })
  
      this.hasMany(models.Transactions, {
        foreignKey: 'voucherId'
      })
    }
  }
  Vouchers.init({
    categoryId: DataTypes.STRING,
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vouchers',
  });
  return Vouchers;
};