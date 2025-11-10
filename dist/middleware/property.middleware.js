import prisma from "../prisma.js";
export async function requirePropertyOwnership(req, res, next) {
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ error: "Property id required" });
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property)
        return res.status(404).json({ error: "Property not found" });
    // superadmins and admins can bypass
    if (req.user?.role === "SUPERADMIN" || req.user?.role === "ADMIN")
        return next();
    // manager must match managerId
    if (req.user?.role === "MANAGER" && property.managerId === req.user.id)
        return next();
    return res.status(403).json({ error: "Forbidden: you do not own this property" });
}
//# sourceMappingURL=property.middleware.js.map