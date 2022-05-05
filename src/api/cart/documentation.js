const Joi = require('joi');

const docs = {
  postCartDoc: {
    description: 'Add to cart',
    notes: 'Request must contain payload { jumlahPesanan } and its required, if payload it is not in accordance with, server would give 400 response code',
    tags: ['api', 'products'],
    validate: {
      params: Joi.object({
        productId: Joi.number().required().description('the id for the product item'),
      }),
      payload: Joi.object({
        jumlahPesanan: Joi.number().required(),
      }).label('cart'),
    },
    response: {
      status: {
        201: Joi.object({
          status: Joi.string(),
          message: Joi.string(),
          data: {
            id: Joi.number(),
          },
        }),
        400: undefined,
      },
    },
  },
  getCartDoc: {
    description: 'Get all cart',
    notes: 'Returns cart items from database',
    tags: ['api', 'cart'],
    response: {
      status: {
        200: Joi.object({
          status: Joi.string(),
          data: Joi.array().items({
            id: Joi.number(),
            jumlahPesanan: Joi.number(),
            product: Joi.object({
              id: Joi.number(),
              kode: Joi.string(),
              nama: Joi.string(),
              harga: Joi.string(),
              isReady: Joi.boolean(),
              gambar: Joi.string(),
              detail: Joi.string(),
            }),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
          }),
        }),
      },
    },
  },
  getCartByIdDoc: {
    description: 'Get specific cart item by id',
    notes: 'Returns a cart item by the id passed in the path',
    tags: ['api', 'cart'], // ADD THIS TAG
    validate: {
      params: Joi.object({
        cartId: Joi.number().required().description('the id for the cart item'),
      }),
    },
    response: {
      status: {
        200: Joi.object({
          status: Joi.string(),
          data: Joi.object({
            id: Joi.number(),
            jumlahPesanan: Joi.number(),
            product: Joi.object({
              id: Joi.number(),
              kode: Joi.string(),
              nama: Joi.string(),
              harga: Joi.number(),
              isReady: Joi.boolean(),
              gambar: Joi.string(),
              detail: Joi.string(),
            }),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
          }),
        }),
        404: undefined,
      },
    },
  },
  putCartByIdDoc: {
    description: 'Update specific cart item by id',
    notes: 'Response returns success if payload it is not in accordance with, else response returns 400 or if product id not contain in database response returns 404',
    tags: ['api', 'cart'],
    validate: {
      params: Joi.object({
        cartId: Joi.number().required().description('the id for the cart item'),
      }),
      payload: Joi.object({
        jumlahPesanan: Joi.number().required(),
      }),
    },
    response: {
      status: {
        200: Joi.object({
          status: Joi.string(),
          message: Joi.string(),
        }),
        400: undefined,
        404: undefined,
      },
    },
  },
  deleteCartByIdDoc: {
    description: 'Delete specific cart by id',
    notes: 'If cart not found server would returns 404',
    tags: ['api', 'cart'],
    validate: {
      params: Joi.object({
        cartId: Joi.number().required().description('the id for the cart item'),
      }),
    },
    response: {
      status: {
        200: Joi.object({
          status: Joi.string(),
          message: Joi.string(),
        }),
        404: undefined,
      },
    },
  },
};

module.exports = docs;
