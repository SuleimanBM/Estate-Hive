import { Request, Response } from "express";
import * as SuperAdminService  from "../services/super-admin.service";

    // Create super admin (rare, but allowed)
export async function createSuperAdmin(req: Request, res: Response) {
        try {
            const admin = await SuperAdminService.createSuperAdmin(req.body);
            res.status(201).json({ success: true, message: "Super admin created", data: admin });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
}

    // --- USER MANAGEMENT ---
export async function getAllAdmins(req: Request, res: Response) {
        try {
            const admins = await SuperAdminService.getAllAdmins();
            res.json({ success: true, data: admins });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
}

export async function getAllUsers(req: Request, res: Response) {
        try {
            const users = await SuperAdminService.getAllUsers();
            console.log("fetched users",users);
            return res.json({ success: true, data: users });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
}

export async function updateUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const user = await SuperAdminService.updateUser(userId, req.body);
            res.json({ success: true, message: "User updated", data: user });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
}

export async function deleteUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            await SuperAdminService.deleteUser(userId);
            res.json({ success: true, message: "User deleted" });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
}

    // --- PROPERTY MANAGEMENT ---
export async function getAllProperties(req: Request, res: Response) {
        try {
            const props = await SuperAdminService.getAllProperties();
            res.json({ success: true, data: props });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
}

export async function updateProperty(req: Request, res: Response) {
        try {
            const { propertyId } = req.params;
            const prop = await SuperAdminService.updateProperty(propertyId, req.body);
            res.json({ success: true, message: "Property updated", data: prop });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
}

export async function deleteProperty(req: Request, res: Response) {
        try {
            const { propertyId } = req.params;
            await SuperAdminService.deleteProperty(propertyId);
            res.json({ success: true, message: "Property deleted" });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
}

    // --- APPLICATION MANAGEMENT ---
export async function getAllApplications(req: Request, res: Response) {
        try {
            const apps = await SuperAdminService.getAllApplications();
            res.json({ success: true, data: apps });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
}

export async function overrideApplicationStatus(req: Request, res: Response) {
        try {
            const { applicationId } = req.params;
            const { status } = req.body; // e.g. APPROVED, DENIED, WITHDRAWN
            const app = await SuperAdminService.overrideApplicationStatus(applicationId, status);
            res.json({ success: true, message: "Application status updated", data: app });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
}

    // --- LEASE MANAGEMENT ---
export async function getAllLeases(req: Request, res: Response) {
        try {
            const leases = await SuperAdminService.getAllLeases();
            res.json({ success: true, data: leases });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
}

export async function overrideLease(req: Request, res: Response) {
        try {
            const { leaseId } = req.params;
            const lease = await SuperAdminService.overrideLease(leaseId, req.body);
            res.json({ success: true, message: "Lease updated", data: lease });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
}

export async function deleteLease(req: Request, res: Response) {
        try {
            const { leaseId } = req.params;
            await SuperAdminService.deleteLease(leaseId);
            res.json({ success: true, message: "Lease deleted" });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    // --- PAYMENT MANAGEMENT ---
export async function getAllPayments(req: Request, res: Response) {
        try {
            const payments = await SuperAdminService.getAllPayments();
            res.json({ success: true, data: payments });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

export async function overridePayment(req: Request, res: Response) {
        try {
            const { paymentId } = req.params;
            const payment = await SuperAdminService.overridePayment(paymentId, req.body);
            res.json({ success: true, message: "Payment updated", data: payment });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
