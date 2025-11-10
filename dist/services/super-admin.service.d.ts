import { Prisma, Role, PaymentStatus, LeaseStatus } from "@prisma/client";
export declare function createSuperAdmin(data: {
    name: string;
    email: string;
    password: string;
}): Promise<{
    email: string;
    name: string;
    id: string;
    role: import("@prisma/client").$Enums.Role;
    createdAt: Date;
}>;
export declare function getAllAdmins(): Promise<{
    email: string;
    name: string;
    id: string;
    role: import("@prisma/client").$Enums.Role;
    createdAt: Date;
}[]>;
export declare function getAllUsers(): Promise<{
    email: string;
    name: string;
    id: string;
    createdAt: Date;
}[]>;
export declare function getAllProperties(): Promise<({
    manager: {
        email: string;
        name: string;
        id: string;
    };
} & {
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
})[]>;
export declare function getAllUnits(): Promise<({
    property: {
        id: string;
        title: string;
    };
} & {
    name: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    metadata: Prisma.JsonValue | null;
    images: Prisma.JsonValue | null;
    propertyId: string;
    rentAmount: Prisma.Decimal;
    depositAmount: Prisma.Decimal;
    unitNumber: string | null;
    sizeSqm: number | null;
    currency: string;
    availability: string;
})[]>;
export declare function getAllApplications(): Promise<({
    property: {
        id: string;
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
    status: import("@prisma/client").$Enums.ApplicationStatus;
    leaseId: string | null;
    propertyId: string;
    tenantId: string;
})[]>;
export declare function getAllLeases(): Promise<({
    property: {
        id: string;
        title: string;
    };
    tenant: {
        email: string;
        name: string;
        id: string;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("@prisma/client").$Enums.LeaseStatus;
    propertyId: string;
    tenantId: string;
    applicationId: string | null;
    startDate: Date;
    endDate: Date | null;
    rentAmount: Prisma.Decimal;
    depositPaid: boolean;
    terms: string | null;
    unitId: string | null;
})[]>;
export declare function getAllPayments(): Promise<({
    user: {
        email: string;
        name: string;
        id: string;
    };
    unit: {
        name: string;
        id: string;
    };
} & {
    userId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("@prisma/client").$Enums.PaymentStatus;
    metadata: Prisma.JsonValue | null;
    leaseId: string | null;
    unitId: string | null;
    currency: string;
    provider: string;
    providerRef: string;
    amount: Prisma.Decimal;
})[]>;
export declare function updateUser(userId: string, data: Partial<{
    name: string;
    email: string;
    role: Role;
}>): Promise<{
    email: string;
    name: string;
    id: string;
    role: import("@prisma/client").$Enums.Role;
}>;
export declare function deleteUser(userId: string): Promise<{
    email: string;
    password: string;
    resetTokenCode: string | null;
    name: string;
    phone: string | null;
    id: string;
    role: import("@prisma/client").$Enums.Role;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    resetTokenExpiry: Date | null;
    scopes: Prisma.JsonValue | null;
}>;
export declare function updateProperty(propertyId: string, data: Partial<{
    title: string;
    description: string;
    price: number;
    status: string;
}>): Promise<{
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
}>;
export declare function deleteProperty(propertyId: string): Promise<{
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
}>;
export declare function overrideApplicationStatus(applicationId: string, status: "PENDING" | "APPROVED" | "DENIED" | "WITHDRAWN"): Promise<{
    attachments: Prisma.JsonValue | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    message: string | null;
    status: import("@prisma/client").$Enums.ApplicationStatus;
    leaseId: string | null;
    propertyId: string;
    tenantId: string;
}>;
export declare function overrideLease(leaseId: string, data: Partial<{
    status: LeaseStatus;
    endDate: Date;
}>): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("@prisma/client").$Enums.LeaseStatus;
    propertyId: string;
    tenantId: string;
    applicationId: string | null;
    startDate: Date;
    endDate: Date | null;
    rentAmount: Prisma.Decimal;
    depositPaid: boolean;
    terms: string | null;
    unitId: string | null;
}>;
export declare function deleteLease(leaseId: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("@prisma/client").$Enums.LeaseStatus;
    propertyId: string;
    tenantId: string;
    applicationId: string | null;
    startDate: Date;
    endDate: Date | null;
    rentAmount: Prisma.Decimal;
    depositPaid: boolean;
    terms: string | null;
    unitId: string | null;
}>;
export declare function overridePayment(paymentId: string, data: Partial<{
    status: PaymentStatus;
    amount: number;
}>): Promise<{
    userId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("@prisma/client").$Enums.PaymentStatus;
    metadata: Prisma.JsonValue | null;
    leaseId: string | null;
    unitId: string | null;
    currency: string;
    provider: string;
    providerRef: string;
    amount: Prisma.Decimal;
}>;
//# sourceMappingURL=super-admin.service.d.ts.map