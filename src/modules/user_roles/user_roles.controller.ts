// Project: Open Indoor Maps
// File: src/modules/user_roles/user_roles.controller.ts

import { Request, Response, NextFunction } from 'express';
import * as userRoleService from './user_roles.service';

/**
 * @openapi
 * tags:
 *   - name: User Roles
 *     description: API endpoints for managing user roles
 * /user-roles:
 *   get:
 *     summary: Get all user roles
 *     tags: [User Roles]
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
 *         description: Returns a list of user roles.
 */
export const getAllUserRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const { userRoles, totalItems } = await userRoleService.getAllUserRoles(page, limit);
        res.json({
            userRoles,
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
 * /user-roles/{id}:
 *   get:
 *     summary: Get a user role by ID
 *     tags: [User Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user role
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the user role.
 *       404:
 *         description: User role not found.
 */
export const getUserRoleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const userRole = await userRoleService.getUserRoleById(id);
    res.json(userRole);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * /user-roles:
 *   post:
 *     summary: Create a new user role
 *     tags: [User Roles]
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
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: User role created successfully.
 *       400:
 *         description: Invalid request body.
 */
export const createUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRole = await userRoleService.createUserRole(req.body);
    res.status(201).json(userRole);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * /user-roles/{id}:
 *   put:
 *     summary: Update a user role by ID
 *     tags: [User Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user role to update
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
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User role updated successfully.
 *       404:
 *         description: User role not found.
 */
export const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const userRole = await userRoleService.updateUserRole(id, req.body);
    res.json(userRole);
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * /user-roles/{id}:
 *   delete:
 *     summary: Delete a user role by ID
 *     tags: [User Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user role to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User role deleted successfully.
 *       404:
 *         description: User role not found.
 */
export const deleteUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    await userRoleService.deleteUserRole(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};