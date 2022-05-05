const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { cart } = require('../../models');

class CartService {
  constructor() {
    this._service = cart;
  }

  async addToCart({ productId }, { jumlahPesanan }) {
    let result = null;
    try {
      result = await this._service.create({ productId, jumlahPesanan });
      if (!result.id) {
        throw new InvariantError('Fail to add cart');
      }
    } catch (error) {
      console.log(error.message);
    }
    return result.id;
  }

  async getCart({ cartId }) {
    let result = null;
    result = await this._service.findByPk(cartId, { include: 'product', attributes: { exclude: ['productId'] }, raw: true });

    if (!result) {
      throw new NotFoundError(`Cart ${cartId} not found`);
    }

    result = {
      id: result.id,
      jumlahPesanan: result.jumlahPesanan,
      product: {
        id: result['product.id'],
        kode: result['product.kode'],
        nama: result['product.nama'],
        harga: result['product.harga'],
        isReady: result['product.isReady'],
        gambar: result['product.gambar'],
        detail: result['product.detail'],
      },
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    return result;
  }

  async getCarts() {
    let data = null;
    const result = [];
    try {
      data = await this._service.findAll({
        include: 'product',
        attributes: {
          exclude: ['productId'],
        },
        raw: true,
      });
      data.forEach((res) => {
        result.push({
          id: res.id,
          jumlahPesanan: res.jumlahPesanan,
          product: {
            id: res['product.id'],
            kode: res['product.kode'],
            nama: res['product.nama'],
            harga: res['product.harga'],
            isReady: res['product.isReady'],
            gambar: res['product.gambar'],
            detail: res['product.detail'],
          },
          createdAt: res.createdAt,
          updatedAt: res.updatedAt,
        });
      });
    } catch (error) {
      console.log(error.message);
    } //
    return result;
  }

  async editCart({ cartId }, { jumlahPesanan }) {
    const newPayload = {
      jumlahPesanan,
    };
    try {
      const result = await this._service.update(newPayload, { where: { id: cartId } });
      if (result[0] === 0) {
        throw new NotFoundError(`Cart ${cartId} not found`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteCart({ cartId }) {
    try {
      const result = await this._service.destroy({ where: { id: cartId } });
      if (!result.id) {
        throw new NotFoundError(`Cart ${cartId} not found`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = CartService;
