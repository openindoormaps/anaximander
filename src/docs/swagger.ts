// Project: Open Indoor Maps
// File: src/docs/swagger.ts
import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Open Indoor Maps API',
      version: '1.0.0',
      description: 'API documentation for Open Indoor Maps',
    },
    servers: [
      {
        url: '/api/v1',
      },
    ],
  },
  apis: [
    // Include all controller files explicitly
    path.join(__dirname, '../modules/**/**.controller.ts'),
    path.join(__dirname, '../modules/**/*.controller.ts'),
    // Include route files if you have separate route definitions
    path.join(__dirname, '../routes/**/*.ts'),
    // Include any additional files that might contain swagger documentation
    path.join(__dirname, '../**/*.swagger.ts'),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);

