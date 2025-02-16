// Project: Open Indoor Maps
// File:  src/modules/permissions/permissions.routes.ts
import express from 'express';
import * as permissionController from './permissions.controller';


const router = express.Router();

router.get('/', permissionController.getAllPermissions);
router.get('/:id', permissionController.getPermissionById);
router.post('/',  permissionController.createPermission);
router.put('/:id', permissionController.updatePermission);
router.delete('/:id', permissionController.deletePermission);

export default router;