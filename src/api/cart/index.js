const CartHandler = require('./handler');
const routes = require('./routes');
const doc = require('./documentation');

module.exports = {
  name: 'cart',
  version: '1.0',
  register: async (server, { service, validator }) => {
    const cartHandler = new CartHandler(service, validator);
    server.route(routes(cartHandler, doc));
  },
};
