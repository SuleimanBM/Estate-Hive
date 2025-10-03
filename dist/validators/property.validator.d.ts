import { z } from "zod";
export declare const createPropertySchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        price: z.ZodNumber;
        address: z.ZodObject<{
            street: z.ZodString;
            city: z.ZodString;
            region: z.ZodString;
            country: z.ZodString;
            lat: z.ZodOptional<z.ZodNumber>;
            lon: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            region?: string;
            city?: string;
            country?: string;
            street?: string;
            lat?: number;
            lon?: number;
        }, {
            region?: string;
            city?: string;
            country?: string;
            street?: string;
            lat?: number;
            lon?: number;
        }>;
        amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        status: z.ZodOptional<z.ZodEnum<["ACTIVE", "ARCHIVED", "UNDER_MAINTENANCE", "PENDING_APPROVAL"]>>;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        status?: "ACTIVE" | "ARCHIVED" | "UNDER_MAINTENANCE" | "PENDING_APPROVAL";
        title?: string;
        price?: number;
        address?: {
            region?: string;
            city?: string;
            country?: string;
            street?: string;
            lat?: number;
            lon?: number;
        };
        amenities?: string[];
    }, {
        description?: string;
        status?: "ACTIVE" | "ARCHIVED" | "UNDER_MAINTENANCE" | "PENDING_APPROVAL";
        title?: string;
        price?: number;
        address?: {
            region?: string;
            city?: string;
            country?: string;
            street?: string;
            lat?: number;
            lon?: number;
        };
        amenities?: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        description?: string;
        status?: "ACTIVE" | "ARCHIVED" | "UNDER_MAINTENANCE" | "PENDING_APPROVAL";
        title?: string;
        price?: number;
        address?: {
            region?: string;
            city?: string;
            country?: string;
            street?: string;
            lat?: number;
            lon?: number;
        };
        amenities?: string[];
    };
}, {
    body?: {
        description?: string;
        status?: "ACTIVE" | "ARCHIVED" | "UNDER_MAINTENANCE" | "PENDING_APPROVAL";
        title?: string;
        price?: number;
        address?: {
            region?: string;
            city?: string;
            country?: string;
            street?: string;
            lat?: number;
            lon?: number;
        };
        amenities?: string[];
    };
}>;
export declare const propertyIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
    }, {
        id?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params?: {
        id?: string;
    };
}, {
    params?: {
        id?: string;
    };
}>;
export declare const searchPropertySchema: z.ZodObject<{
    query: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        minPrice: z.ZodOptional<z.ZodNumber>;
        maxPrice: z.ZodOptional<z.ZodNumber>;
        city: z.ZodOptional<z.ZodString>;
        region: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        amenities: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>, string[], string | string[]>>;
        status: z.ZodOptional<z.ZodEnum<["ACTIVE", "ARCHIVED", "UNDER_MAINTENANCE", "PENDING_APPROVAL"]>>;
        page: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        sortBy: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    }, "strip", z.ZodTypeAny, {
        limit?: number;
        status?: "ACTIVE" | "ARCHIVED" | "UNDER_MAINTENANCE" | "PENDING_APPROVAL";
        region?: string;
        title?: string;
        amenities?: string[];
        minPrice?: number;
        maxPrice?: number;
        city?: string;
        country?: string;
        page?: number;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    }, {
        limit?: number;
        status?: "ACTIVE" | "ARCHIVED" | "UNDER_MAINTENANCE" | "PENDING_APPROVAL";
        region?: string;
        title?: string;
        amenities?: string | string[];
        minPrice?: number;
        maxPrice?: number;
        city?: string;
        country?: string;
        page?: number;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    }>;
}, "strip", z.ZodTypeAny, {
    query?: {
        limit?: number;
        status?: "ACTIVE" | "ARCHIVED" | "UNDER_MAINTENANCE" | "PENDING_APPROVAL";
        region?: string;
        title?: string;
        amenities?: string[];
        minPrice?: number;
        maxPrice?: number;
        city?: string;
        country?: string;
        page?: number;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    };
}, {
    query?: {
        limit?: number;
        status?: "ACTIVE" | "ARCHIVED" | "UNDER_MAINTENANCE" | "PENDING_APPROVAL";
        region?: string;
        title?: string;
        amenities?: string | string[];
        minPrice?: number;
        maxPrice?: number;
        city?: string;
        country?: string;
        page?: number;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    };
}>;
export declare const updatePropertySchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodNumber>;
        amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        status: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        status?: string;
        title?: string;
        price?: number;
        address?: string;
        amenities?: string[];
    }, {
        description?: string;
        status?: string;
        title?: string;
        price?: number;
        address?: string;
        amenities?: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        description?: string;
        status?: string;
        title?: string;
        price?: number;
        address?: string;
        amenities?: string[];
    };
}, {
    body?: {
        description?: string;
        status?: string;
        title?: string;
        price?: number;
        address?: string;
        amenities?: string[];
    };
}>;
//# sourceMappingURL=property.validator.d.ts.map