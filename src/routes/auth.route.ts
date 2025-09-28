import { Router } from 'express';
import {
    registerHandler,
    verifyEmailHandler,
    loginHandler,
    refreshHandler,
    logoutHandler,
    forgotPassword,
    resetPassword, } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
    registerSchema,
    loginSchema,
    refreshSchema,
    forgotPasswordSchema,
    resetPasswordSchema
} from '../validators/auth.validator.js';

const router = Router();


// Registration + Verification
router.post("/register", validate(registerSchema), registerHandler);
router.get("/verify-email/:token", verifyEmailHandler);

// Authentication
router.post("/login", validate(loginSchema), loginHandler);
router.post("/refresh", validate(refreshSchema), refreshHandler);
router.post("/logout", validate(refreshSchema), logoutHandler);

// Password Reset Flow
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);


export default router;