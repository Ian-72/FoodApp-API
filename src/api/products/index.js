const ProductHandler = require('./handler');
const routes = require('./routes');
const doc = require('./documentation');

module.exports = {
  name: 'products',
  version: '1.0',
  register: async (server, { service, validator }) => {
    const productHandler = new ProductHandler(service, validator);
    server.route(routes(productHandler, doc));
  },
};
