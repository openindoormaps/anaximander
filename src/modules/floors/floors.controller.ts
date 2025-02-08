// Project: Open Indoor Maps
// File: src/modules/floors/floors.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as floorService from './floors.service';


/**
 * @openapi
 * tags:
 *   - name: Floors
 *     description: API endpoints for managing floors
 * /floors:
 *   get:
 *     summary: Get all Floors
 *     tags: [Floors]
 *     responses:
 *       200:
 *         description: Returns a list of Floors.
 */

export const getAllFloors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const floors = await floorService.getAllFloors();
    res.json(floors);
  } catch (error) {
    next(error);
  }
};


/**
 * @openapi
 * tags:
 *   - name: Floors
 *     description: API endpoints for managing floors
 * /floors/{id}:
 *   get:
 *     summary: Get a floors by ID
 *     tags: [Floors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the floors to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the floors object.
 *       404:
 *         description: Floors not found.
 */

// Get floor by ID
export const getFloorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const floor = await floorService.getFloorById(id);
    res.json(floor);
  } catch (error) {
    next(error);
  }
};


/**
 * @openapi
 * tags:
 *   - name: Floors
 *     description: API endpoints for managing floors
 * /floors:
 *   post:
 *     summary: Create a new floor
 *     tags: [Floors]
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

// Create a floor
export const createFloor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const floor = await floorService.createFloor(req.body);
    res.status(201).json(floor);
  } catch (error) {
    next(error);
  }
};


/**
 * @openapi
 * tags:
 *   - name: Floors
 *     description: API endpoints for managing floors
 * /floors/{id}:
 *   put:
 *     summary: Update a Floor by ID
 *     tags: [Floors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the floor to update
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
// Update a floor
export const updateFloor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const floor = await floorService.updateFloor(id, req.body);
    res.json(floor);
  } catch (error) {
    next(error);
  }
};


/**
 * @openapi
 * tags:
 *   - name: Floors
 *     description: API endpoints for managing floors
 * /floors/{id}:
 *   delete:
 *     summary: Delete a floor by ID
 *     tags: [Floors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the floor to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Floor deleted successfully.
 *       404:
 *         description: Floor not found.
 */
export const deleteFloor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    await floorService.deleteFloor(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};


/**
 * @openapi
 * tags:
 *   - name: Floors
 *     description: API endpoints for managing floors
 * /floors/building/{id}:
 *   get:
 *     summary: Get floors by building ID
 *     tags: [Floors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the building to retrieve floors for
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Returns a list of floors for the building.
 *       404:
 *         description: Building not found.
 */

// Get floors by building ID
export const getFloorsByBuildingId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const buildingId = parseInt(req.params.buildingId, 10);
    const floors = await floorService.getFloorsByBuildingId(buildingId);
    res.json(floors);
  } catch (error) {
    next(error);
  }
};