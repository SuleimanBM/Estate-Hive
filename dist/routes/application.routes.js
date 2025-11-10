// src/modules/application/application.routes.ts
import { Router } from "express";
import { approve, create, deny, getById, listForManager, listForTenant, withdraw } from "../controllers/application.controller.js";
import { validate } from "../middleware/validate.middleware";
import { createApplicationSchema, applicationIdParam, approveApplicationSchema } from "../validators/application.validator";
import { requireRole } from "../middleware/auth.middleware";
import { requireManagerOfApplication } from "../middleware/application.middleware";
const router = Router();
router.post("/create", validate(createApplicationSchema), create);
router.get("/my", listForTenant);
router.post("/:id/withdraw", validate(applicationIdParam), withdraw);
router.get("/manager", requireRole("MANAGER", "ADMIN", "SUPERADMIN"), listForManager);
router.get("/:id", validate(applicationIdParam), getById);
router.post("/:id/approve", requireRole("MANAGER", "ADMIN", "SUPERADMIN"), requireManagerOfApplication, validate(approveApplicationSchema), approve);
router.post("/:id/deny", requireRole("MANAGER", "ADMIN", "SUPERADMIN"), requireManagerOfApplication, deny);
export default router;
//# sourceMappingURL=application.routes.js.map