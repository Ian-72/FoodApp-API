const Joi = require('joi');
//
const docs = {
  postProductDoc: {
    description: 'Add new product',
    notes: 'Request must contain payload { name, harga, isReady, gambar, detail, totalOrder } and its required, if payload it is not in accordance with, server would give 400 response code',
    tags: ['api', 'products'],
    validate: {
      payload: Joi.object({
        nama: Joi.string().required(),
        harga: Joi.number().required(),
        isReady: Joi.boolean().required(),
        gambar: Joi.string().required(),
        detail: Joi.string().required(),
        totalOrder: Joi.number(),
      }).label('product'),
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
  getProductsDoc: {
    description: 'Get all products',
    notes: 'Returns product items from database',
    tags: ['api', 'products'],
    validate: {
      query: Joi.object({
        filterBy: Joi.string().valid('bestSale'),
      }),
    },
    response: {
      status: {
        200: Joi.object({
          status: Joi.string(),
          data: Joi.array().items({
            id: Joi.number(),
            kode: Joi.string(),
            nama: Joi.string(),
            harga: Joi.number(),
            isReady: Joi.boolean(),
            gambar: Joi.string(),
            detail: Joi.string(),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
          }),
        }),
      },
    },
  },
  getProductByIdDoc: {
    description: 'Get specific product item by id',
    notes: 'Returns a product item by the id passed in the path',
    tags: ['api', 'products'], // ADD THIS TAG
    validate: {
      params: Joi.object({
        productId: Joi.number().required().description('the id for the product item'),
      }),
    },
    response: {
      status: {
        200: Joi.object({
          status: Joi.string(),
          data: Joi.object({
            id: Joi.number(),
            kode: Joi.string(),
            nama: Joi.string(),
            harga: Joi.number(),
            isReady: Joi.boolean(),
            gambar: Joi.string(),
            detail: Joi.string(),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
          }),
        }),
        404: undefined,
      },
    },
  },
  putProductByIdDoc: {
    description: 'Update specific product item by id',
    notes: 'Response returns success if payload it is not in accordance with, else response returns 400 or if product id not contain in database response returns 404',
    tags: ['api', 'products'],
    validate: {
      params: Joi.object({
        productId: Joi.number().required().description('the id for the product item'),
      }),
      payload: Joi.object({
        nama: Joi.string().required(),
        harga: Joi.number().required(),
        isReady: Joi.boolean().required(),
        gambar: Joi.string().required(),
        detail: Joi.string().required(),
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
  deleteProductByIdDoc: {
    description: 'Delete specific product by id',
    notes: 'If product not found response returns 404',
    tags: ['api', 'products'],
    validate: {
      params: Joi.object({
        productId: Joi.number().required().description('the id for the product item'),
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
