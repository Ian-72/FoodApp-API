const Joi = require('joi');

const CartPayloadSchema = Joi.object({
  jumlahPesanan: Joi.number().required(),
});

module.exports = CartPayloadSchema;
