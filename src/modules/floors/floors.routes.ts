// Project: Open Indoor Maps
// File: src/modules/floors/floors.routes.ts
import express from 'express';
import * as floorController from './floors.controller';

const router = express.Router();

router.get('/', floorController.getAllFloors);
router.get('/:id', floorController.getFloorById);
router.post('/', floorController.createFloor);
router.put('/:id', floorController.updateFloor);
router.delete('/:id', floorController.deleteFloor);
router.get('/building/:buildingId', floorController.getFloorsByBuildingId);

export default router;