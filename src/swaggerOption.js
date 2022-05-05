const swaggerOption = {
  info: {
    title: 'FoodApp API Documentation',
    version: '1.0.0',
    description: 'FoodApp RESTful API documentation. This documentation based on OpenAPI specification with Swagger as user interface. In this this API documentation only contain 3 endpoint',
    contact: {
      name: 'Me',
      email: 'rustwell77@gmail.com',
    },
  },
  grouping: 'tags',
  basePath: '/api/v1',
  tags: [
    {
      name: 'products',
      description: 'This products tag',
    },
    {
      name: 'cart',
      description: 'This cart tag',
    },
  ],
  payloadType: 'json',
  documentationPath: '/api/v1',
  schemes: ['http'],
  cors: true,
};

module.exports = swaggerOption;
