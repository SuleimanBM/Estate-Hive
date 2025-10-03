// src/modules/property/property.validator.ts
import { object, string, number, z } from "zod";
export const createPropertySchema = object({
    body: object({
        title: string().min(3, "Title must be at least 3 chars"),
        description: string().optional(),
        price: number().positive("Price must be positive"),
        address: z.object({
            street: z.string(),
            city: z.string(),
            region: z.string().min(1),
            country: z.string().min(1),
            lat: z.number().optional(),
            lon: z.number().optional(),
        }),
        amenities: z.array(z.string()).optional(),
        status: z.enum(["ACTIVE", "ARCHIVED", "UNDER_MAINTENANCE", "PENDING_APPROVAL"]).optional(),
    }),
});
export const propertyIdSchema = object({
    params: object({ id: z.string().uuid() }),
});
export const searchPropertySchema = object({
    query: object({
        title: string().optional(), // search by title (partial match handled in controller/service)
        minPrice: z.coerce.number().nonnegative().optional(),
        maxPrice: z.coerce.number().nonnegative().optional(),
        city: string().optional(),
        region: string().optional(),
        country: string().optional(),
        //amenities: z.string().optional(), // filter by amenities
        amenities: z
            .union([z.string(), z.array(z.string())])
            .transform(val => (typeof val === "string" ? [val] : val))
            .optional(),
        status: z.enum(["ACTIVE", "ARCHIVED", "UNDER_MAINTENANCE", "PENDING_APPROVAL"]).optional(),
        // pagination & sorting
        page: z.coerce.number().min(1).default(1).optional(),
        limit: z.coerce.number().min(1).max(100).default(10).optional(),
        sortBy: string().optional(), // e.g., "price" | "title"
        sortOrder: z.enum(["asc", "desc"]).optional(),
    }),
});
export const updatePropertySchema = object({
    body: object({
        title: string().optional(),
        description: string().optional(),
        address: string().optional(),
        price: number().positive().optional(),
        amenities: z.array(z.string()).optional(),
        status: z.string().optional(),
    }),
});
// export const addressSchema = z.object({
//     street: z.string().min(1),
//     city: z.string().min(1),
//     region: z.string().min(1),
//     country: z.string().min(1),
//     lat: z.number().optional(),
//     lon: z.number().optional(),
// });
// export const unitInputSchema = z.object({
//     unitNumber: z.string().optional(),
//     name: z.string().optional(),
//     sizeSqm: z.number().int().positive().optional(),
//     rentAmount: z.number().positive().optional(),
//     depositAmount: z.number().positive().optional(),
//     currency: z.string().optional(),
//     availability: z.string().optional(),
//     images: z.array(z.string().url()).optional(),
//     metadata: z.any().optional(),
// });
// export const createPropertySchema = z.object({
//     body: z.object({
//         title: z.string().min(3),
//         description: z.string().optional(),
//         address: addressSchema,
//         amenities: z.array(z.string()).optional(),
//         status: z.string().optional(),
//         // optionally create units at the same time
//         units: z.array(unitInputSchema).optional(),
//     }),
// });
// export const updatePropertySchema = z.object({
//     params: z.object({ id: z.string().uuid() }),
//     body: z.object({
//         title: z.string().min(3).optional(),
//         description: z.string().optional(),
//         address: addressSchema.optional(),
//         amenities: z.array(z.string()).optional(),
//         status: z.string().optional(),
//     }),
// });
//# sourceMappingURL=property.validator.js.map