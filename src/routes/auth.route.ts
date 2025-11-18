import { Router } from 'express';
import {
    registerHandler,
    verifyEmailHandler,
    loginHandler,
    refreshHandler,
    logoutHandler,
    forgotPassword,
    resetPassword,
    getProfileHandler,
    updateProfileHandler,
    deleteUserProfileHandler, } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
    registerSchema,
    loginSchema,
    refreshSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    updateProfileSchema
} from '../validators/auth.validator.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();


// Registration + Verification
router.post("/register", validate(registerSchema), registerHandler);
router.get("/verify-email", verifyEmailHandler);

// Authentication
router.post("/login", validate(loginSchema), loginHandler);
router.post("/refresh", validate(refreshSchema), refreshHandler);
router.post("/logout", validate(refreshSchema), logoutHandler);

// Password Reset Flow
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);

//profile management
router.get("/profile", requireAuth, getProfileHandler)
router.put("/profile", requireAuth, validate(updateProfileSchema), updateProfileHandler)
router.delete("/profile", requireAuth, deleteUserProfileHandler)

export default router;