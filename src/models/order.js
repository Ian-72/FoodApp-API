'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    qty: DataTypes.INTEGER,
    total: DataTypes.BIGINT,
    is_checkout: DataTypes.BOOLEAN,
    id_pelanggan: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};