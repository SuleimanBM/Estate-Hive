import { Prisma } from '@prisma/client';
export declare function registerService({ name, email, password, phone }: {
    name: string;
    email: string;
    password: string;
    phone: string;
}): Promise<{
    user: {
        email: string;
        password: string;
        resetTokenCode: string | null;
        name: string;
        phone: string | null;
        id: string;
        role: import("@prisma/client").$Enums.Role;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        resetTokenExpiry: Date | null;
        scopes: Prisma.JsonValue | null;
    };
    accessToken: string;
    refreshToken: string;
}>;
export declare function verifyEmail(token: string): Promise<{
    alreadyVerified: boolean;
    success?: undefined;
    accessToken?: undefined;
    refreshToken?: undefined;
} | {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    alreadyVerified?: undefined;
}>;
export declare function loginService({ email, password }: {
    email: string;
    password: string;
}): Promise<{
    user: {
        email: string;
        password: string;
        resetTokenCode: string | null;
        name: string;
        phone: string | null;
        id: string;
        role: import("@prisma/client").$Enums.Role;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        resetTokenExpiry: Date | null;
        scopes: Prisma.JsonValue | null;
    };
    accessToken: string;
    refreshToken: string;
}>;
export declare function reIssueAccessToken({ refreshToken }: {
    refreshToken: string;
}): Promise<{
    newAccessToken: string;
    newRefreshToken: string;
}>;
export declare function logoutService(refreshToken: any): Promise<void>;
export declare function generateResetCode(email: string): Promise<boolean>;
export declare function resetPassword(email: string, resetTokenCode: string, newPassword: string): Promise<boolean>;
//# sourceMappingURL=auth.service.d.ts.map