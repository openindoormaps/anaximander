// Project: Open Indoor Maps
// File: src/modules/user_roles/user_roles.routes.ts
import express from 'express';
import * as userRoleController from './user_roles.controller';

const router = express.Router();

router.get('/', userRoleController.getAllUserRoles);
router.get('/:id',  userRoleController.getUserRoleById);
router.post('/',  userRoleController.createUserRole);
router.put('/:id',  userRoleController.updateUserRole);
router.delete('/:id',  userRoleController.deleteUserRole);

export default router;