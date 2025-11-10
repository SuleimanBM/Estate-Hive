import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Create super admin
export async function createSuperAdmin(data) {
    // check if exists
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing)
        throw new Error("Super admin already exists");
    return prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password, // hash before saving
            role: "SUPERADMIN",
            isVerified: true,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
}
export async function getAllAdmins() {
    return prisma.user.findMany({
        where: { role: { in: ["SUPERADMIN", "ADMIN", "MANAGER"] } },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
}
export async function getAllUsers() {
    return prisma.user.findMany({
        where: { role: "TENANT" },
        select: { id: true, name: true, email: true, createdAt: true },
    });
}
export async function getAllProperties() {
    return prisma.property.findMany({
        include: {
            manager: { select: { id: true, name: true, email: true } },
        },
    });
}
export async function getAllUnits() {
    return prisma.unit.findMany({
        include: { property: { select: { id: true, title: true } } },
    });
}
export async function getAllApplications() {
    return prisma.application.findMany({
        include: {
            tenant: { select: { id: true, name: true, email: true } },
            property: { select: { id: true, title: true } },
        },
        orderBy: { createdAt: "desc" },
    });
}
export async function getAllLeases() {
    return prisma.lease.findMany({
        include: {
            tenant: { select: { id: true, name: true, email: true } },
            property: { select: { id: true, title: true } },
        },
    });
}
export async function getAllPayments() {
    return prisma.payment.findMany({
        include: {
            user: { select: { id: true, name: true, email: true } },
            unit: { select: { id: true, name: true } },
        },
    });
}
// Update user
export async function updateUser(userId, data) {
    return prisma.user.update({
        where: { id: userId },
        data,
        select: { id: true, name: true, email: true, role: true },
    });
}
export async function deleteUser(userId) {
    return prisma.user.delete({ where: { id: userId } });
}
// Update property
export async function updateProperty(propertyId, data) {
    return prisma.property.update({
        where: { id: propertyId },
        data,
    });
}
export async function deleteProperty(propertyId) {
    return prisma.property.delete({ where: { id: propertyId } });
}
// Applications
export async function overrideApplicationStatus(applicationId, status) {
    return prisma.application.update({
        where: { id: applicationId },
        data: { status },
    });
}
// Leases
export async function overrideLease(leaseId, data) {
    return prisma.lease.update({ where: { id: leaseId }, data });
}
export async function deleteLease(leaseId) {
    return prisma.lease.delete({ where: { id: leaseId } });
}
// Payments
export async function overridePayment(paymentId, data) {
    return prisma.payment.update({ where: { id: paymentId }, data });
}
//# sourceMappingURL=super-admin.service.js.map