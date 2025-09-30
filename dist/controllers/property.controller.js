import { createProperty, updateProperty, getAllProperties, getPropertyById, deleteProperty } from "../services/properties.services.js";
export async function create(req, res) {
    try {
        const managerId = req.user?.id ?? null; // allow null for superadmin creating for others
        const property = await createProperty(managerId, req.body);
        return res.status(201).json({ success: true, data: property });
    }
    catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
export async function getAll(req, res) {
    const items = await getAllProperties();
    return res.json({ success: true, data: items });
}
export async function getById(req, res) {
    const item = await getPropertyById(req.params.id);
    if (!item)
        return res.status(404).json({ success: false, error: "Not found" });
    return res.json({ success: true, data: item });
}
export async function update(req, res) {
    try {
        const updated = await updateProperty(req.params.id, req.body);
        return res.json({ success: true, data: updated });
    }
    catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
export async function remove(req, res, next) {
    try {
        await deleteProperty(req.params.id);
        return res.status(204).send();
    }
    catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
//# sourceMappingURL=property.controller.js.map