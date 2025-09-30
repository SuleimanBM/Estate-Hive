// src/modules/property/property.validator.ts
import { z } from "zod";
export const addressSchema = z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    region: z.string().min(1),
    country: z.string().min(1),
    lat: z.number().optional(),
    lon: z.number().optional(),
});
export const unitInputSchema = z.object({
    unitNumber: z.string().optional(),
    name: z.string().optional(),
    sizeSqm: z.number().int().positive().optional(),
    rentAmount: z.number().positive().optional(),
    depositAmount: z.number().positive().optional(),
    currency: z.string().optional(),
    availability: z.string().optional(),
    images: z.array(z.string().url()).optional(),
    metadata: z.any().optional(),
});
export const createPropertySchema = z.object({
    body: z.object({
        title: z.string().min(3),
        description: z.string().optional(),
        address: addressSchema,
        amenities: z.array(z.string()).optional(),
        status: z.string().optional(),
        // optionally create units at the same time
        units: z.array(unitInputSchema).optional(),
    }),
});
export const updatePropertySchema = z.object({
    params: z.object({ id: z.string().uuid() }),
    body: z.object({
        title: z.string().min(3).optional(),
        description: z.string().optional(),
        address: addressSchema.optional(),
        amenities: z.array(z.string()).optional(),
        status: z.string().optional(),
    }),
});
export const propertyIdParam = z.object({
    params: z.object({ id: z.string().uuid() }),
});
//# sourceMappingURL=property.validator.js.map