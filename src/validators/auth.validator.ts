import { object,string,z } from 'zod';


export const registerSchema = object({
    body: object({
    name: string().min(2),
    email: string().email(),
    password: string().min(8),
    phone: string().optional(),
})});

export const loginSchema = object({
    body: object({
    email: string().email(),
    password: string().min(1),
})});

export const refreshSchema = object({
    body: object({
    refreshToken: string().min(10),
})});


export const forgotPasswordSchema = object({
    body: object({
        email: string().email(),
    }),
});

export const resetPasswordSchema = z.object({
    body: object({
        email: string().email(),
        resetTokenCode: string().min(6).max(6),
        newPassword: string().min(6),
    }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
export type LoginInput = z.infer<typeof loginSchema>;