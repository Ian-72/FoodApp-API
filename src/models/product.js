const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.cart);
    }
  }
  Product.init({
    kode: DataTypes.STRING,
    nama: DataTypes.STRING,
    harga: DataTypes.BIGINT,
    isReady: {
      type: DataTypes.BOOLEAN,
      field: 'is_ready',
    },
    gambar: DataTypes.TEXT,
    detail: DataTypes.TEXT,
    totalOrder: {
      type: DataTypes.INTEGER,
      field: 'total_order',
    },
  }, {
    sequelize,
    modelName: 'product',
  });
  Product.removeAttribute('totalOrder');
  return Product;
};
