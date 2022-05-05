const routes = (handler, doc) => [
  {
    method: 'POST',
    path: '/api/v1/products',
    handler: handler.postProductHandler,
    options: doc.postProductDoc,
  },
  {
    method: 'GET',
    path: '/api/v1/products',
    handler: handler.getProductHandler,
    options: doc.getProductsDoc,
  },
  {
    method: 'GET',
    path: '/api/v1/products/{productId}',
    handler: handler.getProductByIdHandler,
    options: doc.getProductByIdDoc,
  },
  {
    method: 'PUT',
    path: '/api/v1/products/{productId}',
    handler: handler.putProductByIdHandler,
    options: doc.putProductByIdDoc,
  },
  {
    method: 'DELETE',
    path: '/api/v1/products/{productId}',
    handler: handler.deleteProductByIdHandler,
    options: doc.deleteProductByIdDoc,
  },
];

module.exports = routes;
