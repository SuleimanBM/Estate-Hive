import { Router } from 'express';
import {getProfileHandler, updateProfileHandler, deleteUserProfileHandler, } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {updateProfileSchema} from '../validators/auth.validator.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

//profile management
router.get("/", requireAuth, getProfileHandler)
router.put("/", requireAuth, validate(updateProfileSchema), updateProfileHandler)
router.delete("/", requireAuth, deleteUserProfileHandler)

export default router;