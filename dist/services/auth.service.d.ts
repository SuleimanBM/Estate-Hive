export declare function registerService({ name, email, password, phone }: {
    name: string;
    email: string;
    password: string;
    phone?: string;
}): Promise<{
    id: string;
    name: string | null;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    phone: string | null;
    role: import("@prisma/client").$Enums.Role;
    isVerified: boolean;
    scopes: import("@prisma/client/runtime/library").JsonValue | null;
}>;
export declare function loginService({ email, password }: {
    email: string;
    password: string;
}): Promise<{
    user: {
        id: string;
        name: string | null;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        role: import("@prisma/client").$Enums.Role;
        isVerified: boolean;
        scopes: import("@prisma/client/runtime/library").JsonValue | null;
    };
    accessToken: never;
    refreshToken: never;
}>;
export declare function reIssueAccessToken({ refreshToken }: {
    refreshToken: string;
}): Promise<string>;
export declare function logoutService(refreshToken: any): Promise<void>;
//# sourceMappingURL=auth.service.d.ts.map