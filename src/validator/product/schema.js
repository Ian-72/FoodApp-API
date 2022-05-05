const Joi = require('joi');

const ProductPayloadSchema = Joi.object({
  nama: Joi.string().required(),
  harga: Joi.number().required(),
  isReady: Joi.boolean().required(),
  gambar: Joi.string().required(),
  detail: Joi.string().required(),
  totalOrder: Joi.number(),
});

const ProductParamsSchema = Joi.number().required();
const ProductQuerySchema = Joi.object({
  bestSale: Joi.boolean().required(),
});

module.exports = { ProductPayloadSchema, ProductParamsSchema, ProductQuerySchema };
