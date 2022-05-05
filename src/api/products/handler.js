class ProductHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postProductHandler = this.postProductHandler.bind(this);
    this.getProductHandler = this.getProductHandler.bind(this);
    this.getProductByIdHandler = this.getProductByIdHandler.bind(this);
    this.putProductByIdHandler = this.putProductByIdHandler.bind(this);
    this.deleteProductByIdHandler = this.deleteProductByIdHandler.bind(this);
  }

  async postProductHandler({ payload }, h) {
    const id = await this._service.addProduct(payload);

    return h.response({
      status: 'success',
      message: 'product has been added',
      data: {
        id,
      },
    }).code(201);
  }

  async getProductHandler({ query }) {
    const { filterBy } = query;
    let products = null;
    if (filterBy === 'bestSale') {
      products = await this._service.getBestSaleProducts();
    } else {
      products = await this._service.getProducts();
    }
    return {
      status: 'success',
      data: products,
    };
  }

  async getProductByIdHandler({ params }) {
    const product = await this._service.getProduct(params);

    return {
      status: 'success',
      data: product,
    };
  }

  async putProductByIdHandler({ params, payload }) {
    await this._service.editProduct(params, payload);

    return {
      status: 'success',
      message: 'product has been updated',
    };
  }

  async deleteProductByIdHandler({ params }) {
    await this._service.deleteProduct(params);

    return {
      status: 'succes',
      message: 'product has been deleted',
    };
  }
}

module.exports = ProductHandler;
