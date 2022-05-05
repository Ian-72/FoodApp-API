const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product);
    }
  }
  Cart.init({
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
    },
    jumlahPesanan: {
      type: DataTypes.INTEGER,
      field: 'jumlah_pesanan',
    },
  }, {
    sequelize,
    modelName: 'cart',
  });
  Cart.removeAttribute('product_id');
  return Cart;
};
