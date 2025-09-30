// src/modules/property/property.routes.ts
 import { Router } from "express";
// import { getAll, getById, create, update, remove } from "../controllers/property.controller.js";
// import { validate } from "../middleware/validate.middleware.js";
// import { createPropertySchema, updatePropertySchema, propertyIdParam } from "../validators/property.validator.js";
// import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
// import { requirePropertyOwnership } from "../middleware/property.middleware.js";

import {
    createPropertyHandler,
    getPropertiesHandler,
    getPropertyHandler,
    updatePropertyHandler,
    deletePropertyHandler,
    getPresignedUrlHandler,
} from "../controllers/property.controller";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import { validate } from '../middleware/validate.middleware.js';
import { createPropertySchema, propertyIdSchema, searchPropertySchema, updatePropertySchema } from "../validators/property.validator.js";

const router = Router();

router.post("/presigned-url", getPresignedUrlHandler)
router.get("/all-properties", validate(searchPropertySchema), getPropertiesHandler);
router.get("/:id", validate(propertyIdSchema), getPropertyHandler);
router.post("/create", requireAuth, requireRole("ADMIN"), validate(createPropertySchema), createPropertyHandler);
router.patch("/:id", requireAuth, requireRole("ADMIN"), validate(updatePropertySchema),validate(propertyIdSchema), updatePropertyHandler);
router.delete("/:id", requireAuth, requireRole("ADMIN"), validate(updatePropertySchema), validate(propertyIdSchema), deletePropertyHandler);

// Public: list and view
// router.get("/", getAll);
// router.get("/:id", validate(propertyIdParam), getById);

// // Create: managers & admins can create (MANAGER will be set as managerId)
// router.post(
//     "/",
//     requireAuth,
//     requireRole("MANAGER", "ADMIN", "SUPERADMIN"),
//     validate(createPropertySchema),
//     create
// );

// // Update: owner manager, admin or superadmin
// router.put(
//     "/:id",
//     requireAuth,
//     validate(updatePropertySchema),
//     requirePropertyOwnership,
//     update
// );

// // Delete
// router.delete(
//     "/:id",
//     requireAuth,
//     validate(propertyIdParam),
//     requirePropertyOwnership,
//     remove
// );

export default router;
