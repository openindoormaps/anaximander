// Project: Open Indoor Maps
// File: src/modules/users/users.routes.ts
import express from 'express';
import * as userController from './users.controller';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;