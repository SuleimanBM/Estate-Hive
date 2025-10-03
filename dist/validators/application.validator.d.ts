import { z } from "zod";
export declare const createApplicationSchema: z.ZodObject<{
    body: z.ZodObject<{
        propertyId: z.ZodString;
        message: z.ZodOptional<z.ZodString>;
        attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        message?: string;
        attachments?: string[];
        propertyId?: string;
    }, {
        message?: string;
        attachments?: string[];
        propertyId?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        message?: string;
        attachments?: string[];
        propertyId?: string;
    };
}, {
    body?: {
        message?: string;
        attachments?: string[];
        propertyId?: string;
    };
}>;
export declare const applicationIdParam: z.ZodObject<{
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
export declare const approveApplicationSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
    }, {
        id?: string;
    }>;
    body: z.ZodOptional<z.ZodObject<{
        startDate: z.ZodOptional<z.ZodString>;
        endDate: z.ZodOptional<z.ZodString>;
        rentAmount: z.ZodOptional<z.ZodNumber>;
        depositAmount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        startDate?: string;
        endDate?: string;
        rentAmount?: number;
        depositAmount?: number;
    }, {
        startDate?: string;
        endDate?: string;
        rentAmount?: number;
        depositAmount?: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    body?: {
        startDate?: string;
        endDate?: string;
        rentAmount?: number;
        depositAmount?: number;
    };
    params?: {
        id?: string;
    };
}, {
    body?: {
        startDate?: string;
        endDate?: string;
        rentAmount?: number;
        depositAmount?: number;
    };
    params?: {
        id?: string;
    };
}>;
export declare const updateApplicationStatusSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
    }, {
        id?: string;
    }>;
    body: z.ZodObject<{
        status: z.ZodEnum<["PENDING", "APPROVED", "DENIED", "WITHDRAWN"]>;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status?: "PENDING" | "APPROVED" | "DENIED" | "WITHDRAWN";
        reason?: string;
    }, {
        status?: "PENDING" | "APPROVED" | "DENIED" | "WITHDRAWN";
        reason?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        status?: "PENDING" | "APPROVED" | "DENIED" | "WITHDRAWN";
        reason?: string;
    };
    params?: {
        id?: string;
    };
}, {
    body?: {
        status?: "PENDING" | "APPROVED" | "DENIED" | "WITHDRAWN";
        reason?: string;
    };
    params?: {
        id?: string;
    };
}>;
//# sourceMappingURL=application.validator.d.ts.map