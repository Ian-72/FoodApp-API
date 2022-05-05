const InvariantError = require('../../exceptions/InvariantError');
const { ProductPayloadSchema, ProductParamsSchema, ProductQuerySchema } = require('./schema');

const ProductValidator = {
  validateProductPayload: (payload) => {
    const validationResult = ProductPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateProductParams: (params) => {
    const validationResult = ProductParamsSchema.validate(params);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateProductQuery: (query) => {
    const validationResult = ProductQuerySchema.validate(query);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ProductValidator;
