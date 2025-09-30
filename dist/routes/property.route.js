// src/modules/property/property.routes.ts
import { Router } from "express";
import { getAll, getById, create, update, remove } from "../controllers/property.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createPropertySchema, updatePropertySchema, propertyIdParam } from "../validators/property.validator.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { requirePropertyOwnership } from "../middleware/property.middleware.js";
const router = Router();
// Public: list and view
router.get("/", getAll);
router.get("/:id", validate(propertyIdParam), getById);
// Create: managers & admins can create (MANAGER will be set as managerId)
router.post("/", requireAuth, requireRole("MANAGER", "ADMIN", "SUPERADMIN"), validate(createPropertySchema), create);
// Update: owner manager, admin or superadmin
router.put("/:id", requireAuth, validate(updatePropertySchema), requirePropertyOwnership, update);
// Delete
router.delete("/:id", requireAuth, validate(propertyIdParam), requirePropertyOwnership, remove);
export default router;
//# sourceMappingURL=property.route.js.map