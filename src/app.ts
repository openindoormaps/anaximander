// Project: Open Indoor Maps
// File: src/app.ts

import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import * as swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

// Modules routes
import buildingRoutes from './modules/buildings/buildings.routes';
import floorRoutes from './modules/floors/floors.routes';
import userRoutes from './modules/users/users.routes';
import userRoleRoutes from './modules/user_roles/user_roles.routes';
import permissionRoutes from './modules/permissions/permissions.routes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/buildings', buildingRoutes);
app.use('/api/v1/floors', floorRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/user-roles', userRoleRoutes);
app.use('/api/v1/permissions', permissionRoutes);

// Swagger Documentation
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
swaggerUi.setup(swaggerSpec);

// Error Handling
app.use(errorHandler);

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('Open indoor Maps - Anaximander running!');
});

export default app;