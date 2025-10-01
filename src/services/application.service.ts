import { notifyManagerNewApplication, notifyTenantApplicationUpdated } from "../utils/application";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();


// Tenant creates an application for a property
export async function createApplication(tenantId: string, data: { propertyId: string; message?: string; attachments?: string[] }) {
        // ensure property exists and is available
        const property = await prisma.property.findUnique({ where: { id: data.propertyId },});
        if (!property) throw new Error("property not found");
        if (property.status !== "AVAILABLE") {
            // still allow application? business decision — here we allow but warn; you can throw if you want
            // throw new Error("property is not available");
        }

        const application = await prisma.application.create({
            data: {
                property: { connect: { id: data.propertyId } },
                tenant: { connect: { id: tenantId } },
                message: data.message ?? undefined,
                attachments: data.attachments ? (data.attachments as Prisma.JsonValue) : undefined,
            },
        });

        // notify manager
        if (property.managerId) {
            const manager = await prisma.user.findUnique({ where: { id: property.managerId } });
            if (manager?.email) {
                // fire & forget
                notifyManagerNewApplication(manager.email, application.id).catch(console.error);
            }
        }

        return application;
    }

    // Tenant views own applications (with property & property)
export async function getApplicationsByTenant(tenantId: string) {
        return prisma.application.findMany({
            where: { tenantId },
            include: { property: true },
            orderBy: { createdAt: "desc" },
        });
    }

    // Manager: list applications for propertys under manager's properties
export async function getApplicationsForManager(managerId: string) {
        // find properties managed by manager & their propertys' applications
        return prisma.application.findMany({
            where: {
                    property: { managerId },
            },
            include: {
                tenant: true,
                property:true,
            },
            orderBy: { createdAt: "desc" },
        });
}
    
export async function getApplicationById(id: string) {
        return prisma.application.findUnique({
            where: { id },
            include: {
                tenant: true,
                property: true ,
                lease: true,
            },
        });
    }

    // Manager approves application -> create lease (DRAFT) and set application status to APPROVED, link leaseId
export async function approveApplication(applicationId: string, managerId: string, opts?: { startDate?: string; endDate?: string; rentAmount?: number; depositAmount?: number }) {
        // Transactionally verify manager owns the property and create lease + update application
        return prisma.$transaction(async (tx) => {
            const app = await tx.application.findUnique({
                where: { id: applicationId },
                include: { property: true , tenant: true },
            });
            if (!app) throw new Error("Application not found");

            // verify manager owns the property
            const managerOwns = app.property.managerId === managerId;
            if (!managerOwns) throw new Error("Forbidden: you don't manage this property");

            if (app.status !== "PENDING") throw new Error("Application is not pending");

            // determine rent and deposit
            const rentAmount = opts?.rentAmount ?? Number(app.property.price);
            const depositAmount = opts?.depositAmount ?? Number(app.property.price)* 0.2;

            const startDate = opts?.startDate ? new Date(opts.startDate) : new Date();
            const endDate = opts?.endDate ? new Date(opts.endDate) : undefined;

            const lease = await tx.lease.create({
                data: {
                    tenant: { connect: { id: app.tenantId } },
                    property: { connect: { id: app.propertyId } },
                    application: { connect: { id: app.id } },
                    startDate,
                    endDate,
                    rentAmount: new Prisma.Decimal(rentAmount),
                    depositPaid: false,
                    status: "DRAFT",
                },
            });

            await tx.application.update({
                where: { id: app.id },
                data: { status: "APPROVED", leaseId: lease.id },
            });

            // Optionally: set property availability to RESERVED
            await tx.property.update({ where: { id: app.propertyId }, data: { status: "RESERVED" } });

            // notify tenant
            if (app.tenant.email) {
                notifyTenantApplicationUpdated(app.tenant.email, app.id, "APPROVED").catch(console.error);
            }

            return { lease, applicationId: app.id };
        });
    }
export async function denyApplication(applicationId: string, managerId: string, reason?: string) {
        // ensure manager owns property for this application and update status to DENIED
        return prisma.$transaction(async (tx) => {
            const app = await tx.application.findUnique({
                where: { id: applicationId },
                include: { property: true , tenant: true },
            });
            if (!app) throw new Error("Application not found");
            if (app.property.managerId !== managerId) throw new Error("Forbidden: you don't manage this property");

            await tx.application.update({ where: { id: applicationId }, data: { status: "DENIED" } });
            if (app.tenant.email) notifyTenantApplicationUpdated(app.tenant.email, app.id, "DENIED").catch(console.error);

            return { applicationId };
        });
    }

    // Tenant withdraw
export async function withdrawApplication(applicationId: string, tenantId: string) {
        const app = await prisma.application.findUnique({ where: { id: applicationId } });
        if (!app) throw new Error("Application not found");
        if (app.tenantId !== tenantId) throw new Error("Forbidden");
        if (app.status !== "PENDING") throw new Error("Only pending applications can be withdrawn");

        return prisma.application.update({ where: { id: applicationId }, data: { status: "WITHDRAWN" } });
    }
