import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email?: string;
        password?: string;
        name?: string;
        phone?: string;
    }, {
        email?: string;
        password?: string;
        name?: string;
        phone?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        email?: string;
        password?: string;
        name?: string;
        phone?: string;
    };
}, {
    body?: {
        email?: string;
        password?: string;
        name?: string;
        phone?: string;
    };
}>;
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email?: string;
        password?: string;
    }, {
        email?: string;
        password?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        email?: string;
        password?: string;
    };
}, {
    body?: {
        email?: string;
        password?: string;
    };
}>;
export declare const refreshSchema: z.ZodObject<{
    body: z.ZodObject<{
        refreshToken: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        refreshToken?: string;
    }, {
        refreshToken?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        refreshToken?: string;
    };
}, {
    body?: {
        refreshToken?: string;
    };
}>;
export declare const forgotPasswordSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email?: string;
    }, {
        email?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        email?: string;
    };
}, {
    body?: {
        email?: string;
    };
}>;
export declare const resetPasswordSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        resetTokenCode: z.ZodString;
        newPassword: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email?: string;
        resetTokenCode?: string;
        newPassword?: string;
    }, {
        email?: string;
        resetTokenCode?: string;
        newPassword?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body?: {
        email?: string;
        resetTokenCode?: string;
        newPassword?: string;
    };
}, {
    body?: {
        email?: string;
        resetTokenCode?: string;
        newPassword?: string;
    };
}>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=auth.validator.d.ts.map