// Project: Open Indoor Maps
// File: src/modules/buildings/buildings.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as buildingService from './buildings.service';

/**
 * @openapi
 * tags:
 *   - name: Buildings
 *     description: API endpoints for managing buildings
 * /buildings:
 *   get:
 *     summary: Get all buildings
 *     tags: [Buildings]
 *     responses:
 *       200:
 *         description: Returns a list of buildings.
 */
export const getAllBuildings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const buildings = await buildingService.getAllBuildings();
    res.json(buildings);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * tags:
 *   - name: Buildings
 *     description: API endpoints for managing buildings
 * /buildings/{id}:
 *   get:
 *     summary: Get a building by ID
 *     tags: [Buildings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the building to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the building object.
 *       404:
 *         description: Building not found.
 */
export const getBuildingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const building = await buildingService.getBuildingById(id);
    res.json(building);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * tags:
 *   - name: Buildings
 *     description: API endpoints for managing buildings
 * /buildings:
 *   post:
 *     summary: Create a new building
 *     tags: [Buildings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               address:
 *                 type: object
 *               attributes:
 *                 type: object
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Building created successfully.
 *       400:
 *         description: Invalid request body.
 */
export const createBuilding = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const building = await buildingService.createBuilding(req.body);
    res.status(201).json(building);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * tags:
 *   - name: Buildings
 *     description: API endpoints for managing buildings
 * /buildings/{id}:
 *   put:
 *     summary: Update a building by ID
 *     tags: [Buildings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the building to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               address:
 *                 type: object
 *               attributes:
 *                 type: object
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Building updated successfully.
 *       400:
 *         description: Invalid request body.
 *       404:
 *         description: Building not found.
 */
export const updateBuilding = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const building = await buildingService.updateBuilding(id, req.body);
    res.json(building);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * tags:
 *   - name: Buildings
 *     description: API endpoints for managing buildings
 * /buildings/{id}:
 *   delete:
 *     summary: Delete a building by ID
 *     tags: [Buildings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the building to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Building deleted successfully.
 *       404:
 *         description: Building not found.
 */
export const deleteBuilding = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    await buildingService.deleteBuilding(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};