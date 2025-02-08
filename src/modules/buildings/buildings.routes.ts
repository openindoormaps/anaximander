// Project: Open Indoor Maps
// File: src/modules/buildings/buildings.routes.ts

import express from 'express';
import * as buildingController from './buildings.controller';

const router = express.Router();

router.get('/', buildingController.getAllBuildings);
router.get('/:id', buildingController.getBuildingById);
router.post('/', buildingController.createBuilding);
router.put('/:id', buildingController.updateBuilding);
router.delete('/:id', buildingController.deleteBuilding);

export default router;