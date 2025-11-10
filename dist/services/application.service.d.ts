import { Prisma } from "@prisma/client";
export declare function createApplication(tenantId: string, data: {
    propertyId: string;
    message?: string;
    attachments?: string[];
}): Promise<{
    attachments: Prisma.JsonValue | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    message: string | null;
    status: import(".prisma/client").$Enums.ApplicationStatus;
    leaseId: string | null;
    propertyId: string;
    tenantId: string;
}>;
export declare function getApplicationsByTenant(tenantId: string): Promise<({
    property: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string;
        description: string | null;
        price: number;
        address: Prisma.JsonValue;
        amenities: Prisma.JsonValue | null;
        images: Prisma.JsonValue | null;
        managerId: string | null;
    };
} & {
    attachments: Prisma.JsonValue | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    message: string | null;
    status: import(".prisma/client").$Enums.ApplicationStatus;
    leaseId: string | null;
    propertyId: string;
    tenantId: string;
})[]>;
export declare function getApplicationsForManager(managerId: string): Promise<({
    property: {
        id: string;
        status: string;
        title: string;
    };
    tenant: {
        email: string;
        name: string;
        id: string;
    };
} & {
    attachments: Prisma.JsonValue | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    message: string | null;
    status: import(".prisma/client").$Enums.ApplicationStatus;
    leaseId: string | null;
    propertyId: string;
    tenantId: string;
})[]>;
export declare function getApplicationById(id: string): Promise<{
    property: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        title: string;
        description: string | null;
        price: number;
        address: Prisma.JsonValue;
        amenities: Prisma.JsonValue | null;
        images: Prisma.JsonValue | null;
        managerId: string | null;
    };
    tenant: {
        email: string;
        name: string;
        id: string;
    };
    lease: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.LeaseStatus;
        propertyId: string;
        tenantId: string;
        applicationId: string | null;
        startDate: Date;
        endDate: Date | null;
        rentAmount: Prisma.Decimal;
        depositPaid: boolean;
        terms: string | null;
        unitId: string | null;
    };
} & {
    attachments: Prisma.JsonValue | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    message: string | null;
    status: import(".prisma/client").$Enums.ApplicationStatus;
    leaseId: string | null;
    propertyId: string;
    tenantId: string;
}>;
export declare function approveApplication(applicationId: string, managerId: string, opts?: {
    startDate?: string;
    endDate?: string;
    rentAmount?: number;
    depositAmount?: number;
}): Promise<{
    lease: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.LeaseStatus;
        propertyId: string;
        tenantId: string;
        applicationId: string | null;
        startDate: Date;
        endDate: Date | null;
        rentAmount: Prisma.Decimal;
        depositPaid: boolean;
        terms: string | null;
        unitId: string | null;
    };
    applicationId: string;
}>;
export declare function denyApplication(applicationId: string, managerId: string, reason?: string): Promise<{
    applicationId: string;
}>;
export declare function withdrawApplication(applicationId: string, tenantId: string): Promise<{
    attachments: Prisma.JsonValue | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    message: string | null;
    status: import(".prisma/client").$Enums.ApplicationStatus;
    leaseId: string | null;
    propertyId: string;
    tenantId: string;
}>;
//# sourceMappingURL=application.service.d.ts.map