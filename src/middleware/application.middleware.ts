// src/modules/application/application.middleware.ts
import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

// Ensure current user manages the property related to the application
export async function requireManagerOfApplication(req: Request, res: Response, next: NextFunction) {
    const appId = req.params.id;
    const app = await prisma.application.findUnique({ where: { id: appId }, include: { property: true } });
    if (!app) return res.status(404).json({ error: "Application not found" });

    const managerId = app.property.managerId;
    if (!managerId) return res.status(403).json({ error: "This property has no manager assigned" });

    // superadmins/admin bypass should be checked by requireRole earlier if desired
    if (req.user!.role === "SUPERADMIN" || req.user!.role === "ADMIN" || managerId === req.user!.id) {
        return next();
    }

    return res.status(403).json({ error: "Forbidden: you do not manage this property" });
}
