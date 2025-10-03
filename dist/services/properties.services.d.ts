import { Prisma } from "@prisma/client";
export declare function createProperty(managerId: string, data: any): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    status: string;
    title: string;
    price: number;
    address: Prisma.JsonValue;
    amenities: Prisma.JsonValue | null;
    images: Prisma.JsonValue | null;
    managerId: string | null;
}>;
export declare function getAllProperties(filters: any): Promise<{
    data: ({} & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: string;
        title: string;
        price: number;
        address: Prisma.JsonValue;
        amenities: Prisma.JsonValue | null;
        images: Prisma.JsonValue | null;
        managerId: string | null;
    })[];
    pagination: {
        total: number;
        page: any;
        limit: any;
        totalPages: number;
    };
}>;
export declare function getPropertyById(id: string): Promise<{} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    status: string;
    title: string;
    price: number;
    address: Prisma.JsonValue;
    amenities: Prisma.JsonValue | null;
    images: Prisma.JsonValue | null;
    managerId: string | null;
}>;
export declare function updateProperty(id: string, data: any): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    status: string;
    title: string;
    price: number;
    address: Prisma.JsonValue;
    amenities: Prisma.JsonValue | null;
    images: Prisma.JsonValue | null;
    managerId: string | null;
}>;
export declare function deleteProperty(id: string): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    status: string;
    title: string;
    price: number;
    address: Prisma.JsonValue;
    amenities: Prisma.JsonValue | null;
    images: Prisma.JsonValue | null;
    managerId: string | null;
}>;
export declare function generatePresignedUrl(fileTypes: string[], folder: string): Promise<any[]>;
export declare function getFileUrl(fileKeys: string | string[]): Promise<string[]>;
//# sourceMappingURL=properties.services.d.ts.map