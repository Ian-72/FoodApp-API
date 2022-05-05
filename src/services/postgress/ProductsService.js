const { nanoid } = require('nanoid');
const { product } = require('../../models/index');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');

class ProductsService {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._product = product;
  }

  async addProduct({
    nama,
    harga,
    isReady,
    gambar,
    detail,
  }) {
    let result = null;
    try {
      const productPayload = {
        kode: `product-${nanoid(4)}`,
        nama,
        harga,
        isReady,
        gambar,
        detail,
      };

      result = await this._product.create(productPayload);

      if (!result.id) {
        throw new InvariantError('Fail to add product');
      }
    } catch (error) {
      console.error(error.message);
    }
    return result.id;
  }

  async getProducts() {
    let result = null;
    try {
      result = await this._product.findAll({
        raw: true,
        limit: 50,
      });
    } catch (error) {
      console.log(error.message);
    }
    return result;
  }

  async getProduct({ productId }) {
    const result = await this._product.findByPk(productId, {
      raw: true,
    });
    if (!result) {
      throw new NotFoundError(`Product ${productId} not found`);
    }
    return result;
  }

  async getBestSaleProducts() {
    const result = await this._product.findAll({
      raw: true,
      limit: 10,
      order: [
        [['total_order', 'DESC']],
      ],
    });

    return result;
  }

  async editProduct({ productId }, {
    nama,
    harga,
    isReady,
    gambar,
    detail,
  }) {
    const newProductPayload = {
      nama,
      harga,
      isReady,
      gambar,
      detail,
    };
    try {
      const result = await this._product.update(newProductPayload, { where: { id: productId } });
      if (result[0] === 0) {
        throw new NotFoundError(`Product ${productId} not found`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteProduct({ productId }) {
    try {
      const result = await this._product.destroy({ where: { id: productId } });
      if (!result.id) {
        throw new NotFoundError(`Product ${productId} not found`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = ProductsService;
