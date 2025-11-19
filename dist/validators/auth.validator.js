import { email, object, string, z } from 'zod';
export const registerSchema = object({
    body: object({
        name: string().min(2),
        email: email(),
        password: string().min(8),
        phone: string().optional(),
        role: z.enum(["SUPERADMIN", "MANAGER", "TENANT"]).default("TENANT")
    })
});
export const loginSchema = object({
    body: object({
        email: string().email(),
        password: string().min(1),
    })
});
export const refreshSchema = object({
    body: object({
        refreshToken: string().min(10),
    })
});
export const forgotPasswordSchema = object({
    body: object({
        email: email(),
    }),
});
export const resetPasswordSchema = z.object({
    body: object({
        email: string().email(),
        resetTokenCode: string().min(6).max(6),
        newPassword: string().min(6),
    }),
});
export const updateProfileSchema = z.object({
    name: string().min(2).optional(),
    email: email().optional(),
    phone: string().optional(),
    photoUrl: string().optional(),
    address: string().optional(),
});
//# sourceMappingURL=auth.validator.js.map