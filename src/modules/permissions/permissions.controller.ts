// Project: Open Indoor Maps
// File: src/modules/permissions/permissions.controller.ts

import { Request, Response, NextFunction } from 'express';
import * as permissionService from './permissions.service';

/**
 * @openapi
 * tags:
 *   - name: Permissions
 *     description: API endpoints for managing permissions
 * /permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Returns a list of permissions.
 */
export const getAllPermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const { permissions, totalItems } = await permissionService.getAllPermissions(page, limit);
        res.json({
            permissions,
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @openapi
 * /permissions/{id}:
 *   get:
 *     summary: Get a permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the permission
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the permission.
 *       404:
 *         description: Permission not found.
 */
export const getPermissionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const permission = await permissionService.getPermissionById(id);
    res.json(permission);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * /permissions:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
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
 *               module:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Permission created successfully.
 *       400:
 *         description: Invalid request body.
 */
export const createPermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const permission = await permissionService.createPermission(req.body);
    res.status(201).json(permission);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * /permissions/{id}:
 *   put:
 *     summary: Update a permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the permission to update
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
 *               module:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Permission updated successfully.
 *       404:
 *         description: Permission not found.
 */
export const updatePermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const permission = await permissionService.updatePermission(id, req.body);
    res.json(permission);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * /permissions/{id}:
 *   delete:
 *     summary: Delete a permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the permission to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Permission deleted successfully.
 *       404:
 *         description: Permission not found.
 */
export const deletePermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    await permissionService.deletePermission(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};