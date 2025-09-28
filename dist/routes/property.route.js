import express from 'express';
import { createLand, createBuilding, editLandById, editBuildingById, deleteBuildingById, deleteLandById, uploadLandImage } from '../controllers/property.controller.js';
const router = express.Router();
router.post('/land', createLand);
router.post('/building', createBuilding);
router.delete('/deleteLand/:id', deleteLandById); // Fixed: added :id parameter
router.delete('/deleteBuilding/:id', deleteBuildingById); // Fixed: added :id parameter
router.patch('/editLand/:id', editLandById); // Fixed: added :id parameter
router.patch('/editBuilding/:id', editBuildingById); // Fixed: added :id parameter and fixed route name
router.post('/upload', uploadLandImage);
export default router;
//# sourceMappingURL=property.route.js.map