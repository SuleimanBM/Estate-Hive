import { createApplication, getApplicationById, getApplicationsByTenant, getApplicationsForManager, approveApplication, denyApplication, withdrawApplication } from "../services/application.service.js";
export async function create(req, res) {
    try {
        const tenantId = req.user.id;
        const { propertyId, message, attachments } = req.body;
        const app = await createApplication(tenantId, { propertyId, message, attachments });
        return res.status(201).json({ success: true, data: app });
    }
    catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
export async function listForTenant(req, res) {
    const tenantId = req.user.id;
    const items = await getApplicationsByTenant(tenantId);
    return res.json({ success: true, data: items });
}
export async function listForManager(req, res) {
    const managerId = req.user.id;
    const items = await getApplicationsForManager(managerId);
    return res.json({ success: true, data: items });
}
export async function getById(req, res) {
    const id = req.params.id;
    const app = await getApplicationById(id);
    if (!app)
        return res.status(404).json({ success: false, error: "Not found" });
    return res.json({ success: true, data: app });
}
export async function approve(req, res) {
    try {
        const managerId = req.user.id;
        const applicationId = req.params.id;
        const { startDate, endDate, rentAmount, depositAmount } = req.body || {};
        const result = await approveApplication(applicationId, managerId, { startDate, endDate, rentAmount, depositAmount });
        return res.json({ success: true, data: result });
    }
    catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
export async function deny(req, res) {
    try {
        const managerId = req.user.id;
        const applicationId = req.params.id;
        const { reason } = req.body || {};
        const result = await denyApplication(applicationId, managerId, reason);
        return res.json({ success: true, data: result });
    }
    catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
export async function withdraw(req, res) {
    try {
        const tenantId = req.user.id;
        const applicationId = req.params.id;
        const result = await withdrawApplication(applicationId, tenantId);
        return res.json({ success: true, data: result });
    }
    catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}
//# sourceMappingURL=application.controller.js.map