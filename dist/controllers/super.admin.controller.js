import * as SuperAdminService from "../services/super-admin.service";
// Create super admin (rare, but allowed)
export async function createSuperAdmin(req, res) {
    try {
        const admin = await SuperAdminService.createSuperAdmin(req.body);
        res.status(201).json({ success: true, message: "Super admin created", data: admin });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
// --- USER MANAGEMENT ---
export async function getAllAdmins(req, res) {
    try {
        const admins = await SuperAdminService.getAllAdmins();
        res.json({ success: true, data: admins });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export async function getAllUsers(req, res) {
    try {
        const users = await SuperAdminService.getAllUsers();
        console.log("fetched users", users);
        return res.json({ success: true, data: users });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export async function updateUser(req, res) {
    try {
        const { userId } = req.params;
        const user = await SuperAdminService.updateUser(userId, req.body);
        res.json({ success: true, message: "User updated", data: user });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
export async function deleteUser(req, res) {
    try {
        const { userId } = req.params;
        await SuperAdminService.deleteUser(userId);
        res.json({ success: true, message: "User deleted" });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
// --- PROPERTY MANAGEMENT ---
export async function getAllProperties(req, res) {
    try {
        const props = await SuperAdminService.getAllProperties();
        res.json({ success: true, data: props });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export async function updateProperty(req, res) {
    try {
        const { propertyId } = req.params;
        const prop = await SuperAdminService.updateProperty(propertyId, req.body);
        res.json({ success: true, message: "Property updated", data: prop });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
export async function deleteProperty(req, res) {
    try {
        const { propertyId } = req.params;
        await SuperAdminService.deleteProperty(propertyId);
        res.json({ success: true, message: "Property deleted" });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
// --- APPLICATION MANAGEMENT ---
export async function getAllApplications(req, res) {
    try {
        const apps = await SuperAdminService.getAllApplications();
        res.json({ success: true, data: apps });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export async function overrideApplicationStatus(req, res) {
    try {
        const { applicationId } = req.params;
        const { status } = req.body; // e.g. APPROVED, DENIED, WITHDRAWN
        const app = await SuperAdminService.overrideApplicationStatus(applicationId, status);
        res.json({ success: true, message: "Application status updated", data: app });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
// --- LEASE MANAGEMENT ---
export async function getAllLeases(req, res) {
    try {
        const leases = await SuperAdminService.getAllLeases();
        res.json({ success: true, data: leases });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export async function overrideLease(req, res) {
    try {
        const { leaseId } = req.params;
        const lease = await SuperAdminService.overrideLease(leaseId, req.body);
        res.json({ success: true, message: "Lease updated", data: lease });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
export async function deleteLease(req, res) {
    try {
        const { leaseId } = req.params;
        await SuperAdminService.deleteLease(leaseId);
        res.json({ success: true, message: "Lease deleted" });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
// --- PAYMENT MANAGEMENT ---
export async function getAllPayments(req, res) {
    try {
        const payments = await SuperAdminService.getAllPayments();
        res.json({ success: true, data: payments });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export async function overridePayment(req, res) {
    try {
        const { paymentId } = req.params;
        const payment = await SuperAdminService.overridePayment(paymentId, req.body);
        res.json({ success: true, message: "Payment updated", data: payment });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}
//# sourceMappingURL=super.admin.controller.js.map