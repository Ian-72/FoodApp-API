const routes = (handler, doc) => [
  {
    method: 'POST',
    path: '/api/v1/products/{productId}/cart',
    handler: handler.postCartHandler,
    options: doc.postCartDoc,
  },
  {
    method: 'GET',
    path: '/api/v1/cart',
    handler: handler.getCartHandler,
    options: doc.getCartDoc,
  },
  {
    method: 'GET',
    path: '/api/v1/cart/{cartId}',
    handler: handler.getCartByIdHandler,
    options: doc.getCartByIdDoc,
  },
  {
    method: 'PUT',
    path: '/api/v1/cart/{cartId}',
    handler: handler.putCartByIdHandler,
    options: doc.putCartByIdDoc,
  },
  {
    method: 'DELETE',
    path: '/api/v1/cart/{cartId}',
    handler: handler.deleteCartByIdHandler,
    options: doc.deleteCartByIdDoc,
  },
];

module.exports = routes;
