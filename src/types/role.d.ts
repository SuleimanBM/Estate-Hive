type Role = "SUPERADMIN" | "ADMIN" | "MANAGER" | "TENANT";

declare global {
    namespace Express {
        interface Request {
            user?: {
                role: Role;
                id: string;
            };
        }
    }
}
