const ProductsService = require('./services/postgress/ProductsService');
const products = require('./api/products');
const ProductValidator = require('./validator/product');

const CartService = require('./services/postgress/CartService');
const cart = require('./api/cart');
const CartValidator = require('./validator/cart');

const productService = new ProductsService();
const cartService = new CartService();

const foodAppPlugins = [
  {
    plugin: products,
    options: {
      service: productService,
      validator: ProductValidator,
    },
  },
  {
    plugin: cart,
    options: {
      service: cartService,
      validator: CartValidator,
    },
  },
];

module.exports = foodAppPlugins;
