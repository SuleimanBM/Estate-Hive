import { Router } from "express";
import { createSuperAdmin, deleteLease, deleteProperty, deleteUser, getAllAdmins, getAllApplications, getAllLeases, getAllPayments, getAllProperties, getAllUsers, overrideApplicationStatus, overrideLease, overridePayment, updateProperty, updateUser } from "../controllers/super.admin.controller.js";
const router = Router();
router.post("/", createSuperAdmin);
router.get("/users", getAllUsers);
router.get("/admins", getAllAdmins);
router.put("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);
// --- PROPERTY MANAGEMENT ---
router.get("/properties", getAllProperties);
router.put("/properties/:propertyId", updateProperty);
router.delete("/properties/:propertyId", deleteProperty);
// --- APPLICATION MANAGEMENT ---
router.get("/applications", getAllApplications);
router.put("/applications/:applicationId/status", overrideApplicationStatus);
// --- LEASE MANAGEMENT ---
router.get("/leases", getAllLeases);
router.put("/leases/:leaseId", overrideLease);
router.delete("/leases/:leaseId", deleteLease);
// --- PAYMENT MANAGEMENT ---
router.get("/payments", getAllPayments);
router.put("/payments/:paymentId", overridePayment);
export default router;
//# sourceMappingURL=superadmin.routes.js.map