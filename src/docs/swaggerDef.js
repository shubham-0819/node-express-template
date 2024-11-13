import config from '../config/config.js';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'note API documentation',
    version: '0.0.1',
    license: {
      name: 'MIT',
      url: 'https://github.com/shubham-0819/node-express-template/blob/main/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

export default swaggerDef;
