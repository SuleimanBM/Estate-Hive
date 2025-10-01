// src/modules/application/application.validator.ts
import { z } from "zod";

export const createApplicationSchema = z.object({
    body: z.object({
        propertyId: z.string().uuid(),
        message: z.string().min(1).optional(),
        attachments: z.array(z.string().url()).optional(),
    }),
});

export const applicationIdParam = z.object({
    params: z.object({
        id: z.string().uuid(),
    }),
});

// Manager approves/denies: allow supplying lease dates for created lease (optional)
export const approveApplicationSchema = z.object({
    params: z.object({ id: z.string().uuid() }),
    body: z.object({
        startDate: z.string().optional(), // ISO date string
        endDate: z.string().optional(),
        // optionally override rent or deposit (should be numbers)
        rentAmount: z.number().positive().optional(),
        depositAmount: z.number().positive().optional(),
    }).optional(),
});

export const updateApplicationStatusSchema = z.object({
    params: z.object({ id: z.string().uuid() }),
    body: z.object({
        status: z.enum(["PENDING", "APPROVED", "DENIED", "WITHDRAWN"]),
        reason: z.string().optional(),
    }),
});
