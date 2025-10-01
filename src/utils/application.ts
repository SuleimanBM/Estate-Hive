// src/modules/application/application.utils.ts
// small helper stubs - replace with real email/notification service
export async function notifyManagerNewApplication(managerEmail: string, applicationId: string) {
    // Placeholder: enqueue email/notification
    console.log(`Notify manager ${managerEmail} of new application ${applicationId}`);
}

export async function notifyTenantApplicationUpdated(tenantEmail: string, applicationId: string, status: string) {
    console.log(`Notify tenant ${tenantEmail} that application ${applicationId} is now ${status}`);
}
