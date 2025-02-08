// Project: Open Indoor Maps
// File: src/docs/swagger.ts
import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Open Indoor Maps API',
      version: '1.0.0',
      description: 'API for Open Indoor Maps',
    },
    servers: [
      {
        url: '/api/v1',
      },
    ],
  },
  apis: ['./src/modules/**/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);