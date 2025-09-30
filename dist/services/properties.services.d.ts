import { Prisma } from "@prisma/client";
export declare function createProperty(managerId: string, data: any): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    status: string;
    title: string;
    address: Prisma.JsonValue;
    amenities: Prisma.JsonValue | null;
    managerId: string | null;
}>;
export declare function getAllProperties(): Promise<({
    manager: {
        email: string;
        password: string;
        resetTokenCode: string | null;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        isVerified: boolean;
        resetTokenExpiry: Date | null;
        scopes: Prisma.JsonValue | null;
    };
    units: {
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        unitNumber: string | null;
        sizeSqm: number | null;
        rentAmount: Prisma.Decimal;
        depositAmount: Prisma.Decimal;
        currency: string;
        availability: string;
        images: Prisma.JsonValue | null;
        metadata: Prisma.JsonValue | null;
        propertyId: string;
    }[];
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    status: string;
    title: string;
    address: Prisma.JsonValue;
    amenities: Prisma.JsonValue | null;
    managerId: string | null;
})[]>;
export declare function getPropertyById(id: string): Promise<{
    manager: {
        email: string;
        password: string;
        resetTokenCode: string | null;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        isVerified: boolean;
        resetTokenExpiry: Date | null;
        scopes: Prisma.JsonValue | null;
    };
    units: {
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        unitNumber: string | null;
        sizeSqm: number | null;
        rentAmount: Prisma.Decimal;
        depositAmount: Prisma.Decimal;
        currency: string;
        availability: string;
        images: Prisma.JsonValue | null;
        metadata: Prisma.JsonValue | null;
        propertyId: string;
    }[];
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    status: string;
    title: string;
    address: Prisma.JsonValue;
    amenities: Prisma.JsonValue | null;
    managerId: string | null;
}>;
export declare function updateProperty(id: string, data: any): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    status: string;
    title: string;
    address: Prisma.JsonValue;
    amenities: Prisma.JsonValue | null;
    managerId: string | null;
}>;
export declare function deleteProperty(id: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    status: string;
    title: string;
    address: Prisma.JsonValue;
    amenities: Prisma.JsonValue | null;
    managerId: string | null;
}>;
//# sourceMappingURL=properties.services.d.ts.map