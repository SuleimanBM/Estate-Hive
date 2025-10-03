// src/modules/application/application.utils.ts
// small helper stubs - replace with real email/notification service
export async function notifyManagerNewApplication(managerEmail, applicationId) {
    // Placeholder: enqueue email/notification
    console.log(`Notify manager ${managerEmail} of new application ${applicationId}`);
}
export async function notifyTenantApplicationUpdated(tenantEmail, applicationId, status) {
    console.log(`Notify tenant ${tenantEmail} that application ${applicationId} is now ${status}`);
}
//# sourceMappingURL=application.js.map