const Hapi = require('@hapi/hapi');

const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const HapiSwagger = require('hapi-swagger');

const ClientError = require('./exceptions/ClientError');
const NotFoundError = require('./exceptions/NotFoundError');

const swaggerOption = require('./swaggerOption');
const foodAppPlugins = require('./foodAppPlugins');

class App {
  constructor() {
    this.server = new Hapi.Server({
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 5000,
    });

    this.server.ext('onPreResponse', (request, h) => {
      const { response } = request;

      if (response instanceof ClientError) {
        if (response instanceof NotFoundError) {
          return h.response({
            status: 'Not Found',
            message: response.message,
            data: {},
          }).code(response.statusCode);
        }

        return h.response({
          status: 'Bad Request',
          message: response.message,
          data: {},
        }).code(response.statusCode);
      }
      return response.continue || response;
    });
  }

  async loadPlugin() {
    await this.server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOption,
      },
    ]);

    await this.server.register(foodAppPlugins);
  }

  async startServer() {
    await this.loadPlugin();
    await this.server.start();

    console.log(`Server running on ${this.server.info.uri} env ${process.env.NODE_ENV} and PID ${process.pid}`);
  }
}

module.exports = App;
