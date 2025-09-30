import { Request, Response, NextFunction } from 'express';
export declare function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare const requireRole: (...allowed: Array<"SUPERADMIN" | "ADMIN" | "MANAGER" | "TENANT">) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.middleware.d.ts.map