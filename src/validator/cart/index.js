const InvariantError = require('../../exceptions/InvariantError');

const CartPayloadSchema = require('./schema');

const CartValidator = {
  validateCartPayload: (payload) => {
    const validationResult = CartPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CartValidator;
