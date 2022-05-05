class CartHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postCartHandler = this.postCartHandler.bind(this);
    this.getCartHandler = this.getCartHandler.bind(this);
    this.getCartByIdHandler = this.getCartByIdHandler.bind(this);
    this.putCartByIdHandler = this.putCartByIdHandler.bind(this);
    this.deleteCartByIdHandler = this.deleteCartByIdHandler.bind(this);
  }

  async postCartHandler({ params, payload }) {
    this._validator.validateCartPayload(payload);
    const id = await this._service.addToCart(params, payload);
    return {
      status: 'success',
      message: 'Product has been added to cart',
      data: {
        id,
      },
    };
  }

  async getCartHandler() {
    const carts = await this._service.getCarts();

    return {
      status: 'success',
      data: carts,
    };
  }

  async getCartByIdHandler({ params }) {
    const cart = await this._service.getCart(params);
    console.log(cart);
    return {
      status: 'success',
      data: cart,
    };
  }

  async putCartByIdHandler({ params, payload }) {
    await this._service.editCart(params, payload);

    return {
      status: 'success',
      message: 'product in cart has been updated',
    };
  }

  async deleteCartByIdHandler({ params }) {
    await this._service.deleteCart(params);

    return {
      status: 'success',
      data: 'product has been deleted from card',
    };
  }
}

module.exports = CartHandler;
