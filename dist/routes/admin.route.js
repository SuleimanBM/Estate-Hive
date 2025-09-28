import express from 'express';
import { createAdmin, loginAdmin, logoutAdmin, forgotPasswordCodeGeneration, verifyResetCode } from '../controllers/admin.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { authorization } from '../middleware/authorization.js';
import { authValidator } from '../middleware/auth.validator.js';
import { resetTokenCodeVerificationValidator } from '../src/validators/verify.reset.code.validator.js';
import { resetTokenCodeCodeValidator } from '../src/validators/reset.code.validator.js';
import { validateAdmin } from '../src/validators/admin.validator.js';
const router = express.Router();
router.post('/newAdmin', validateAdmin, validate, createAdmin);
router.post('/loginAdmin', authValidator, validate, loginAdmin);
router.post('/logoutAdmin', authorization, logoutAdmin);
router.patch('/forgotPasswordCodeGeneration', resetTokenCodeVerificationValidator, validate, forgotPasswordCodeGeneration);
router.patch('/verifyResetCode', resetTokenCodeCodeValidator, validate, verifyResetCode);
export default router;
//# sourceMappingURL=admin.route.js.map