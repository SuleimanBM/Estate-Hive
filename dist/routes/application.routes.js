// src/modules/application/application.routes.ts
import { Router } from "express";
import { approve, create, deny, getById, listForManager, listForTenant, withdraw } from "../controllers/application.controller.js";
import { validate } from "../middleware/validate.middleware";
import { createApplicationSchema, applicationIdParam, approveApplicationSchema } from "../validators/application.validator";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import { requireManagerOfApplication } from "../middleware/application.middleware";
const router = Router();
// Tenant endpoints
router.post("/", requireAuth, validate(createApplicationSchema), create);
router.get("/my", requireAuth, listForTenant);
router.post("/:id/withdraw", requireAuth, validate(applicationIdParam), withdraw);
// Manager endpoints
router.get("/manager", requireAuth, requireRole("MANAGER", "ADMIN", "SUPERADMIN"), listForManager);
router.get("/:id", requireAuth, validate(applicationIdParam), getById);
router.post("/:id/approve", requireAuth, requireRole("MANAGER", "ADMIN", "SUPERADMIN"), requireManagerOfApplication, validate(approveApplicationSchema), approve);
router.post("/:id/deny", requireAuth, requireRole("MANAGER", "ADMIN", "SUPERADMIN"), requireManagerOfApplication, deny);
export default router;
//# sourceMappingURL=application.routes.js.map