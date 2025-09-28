import express from 'express';
import { createSuperAdmin, 
/*loginSuperAdmin,
logoutSuperAdmin,
forgotPasswordCodeGeneration,
verifyResetCode,*/
getAllAdmins, getAllUsers, getAllLands, getAllBuildings, getAllTransactions } from '../controllers/super.admin.controller.js';
const router = express.Router();
router.post('/create-super', createSuperAdmin); // Changed from GET to POST for creating resource
router.get('/admins', getAllAdmins);
router.get('/users', getAllUsers);
router.get('/lands', getAllLands);
router.get('/buildings', getAllBuildings);
router.get('/transactions', getAllTransactions);
export default router;
//# sourceMappingURL=super.admin.routes.js.map