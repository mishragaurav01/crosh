import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Crosh Authentication API',
      version: '1.0.0',
      description:
        'API documentation for Crosh Identity and Authentication Module',
    },
    servers: [
      {
        url: '/api/v1',
        description: 'V1 API',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Enter your Bearer token in the format "Bearer <token>" or it will securely read HttpOnly cookies if present',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
          description: 'Automated HttpOnly secure cookie injected on login',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
        cookieAuth: [],
      },
    ],
  },
  apis: [
    './src/modules/identity/auth/routes/*.ts',
    './src/modules/identity/auth/controllers/*.ts',
  ], // Path to annotations
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express): void => {
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { customSiteTitle: 'API Docs' }),
  );
};
