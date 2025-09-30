import { Request, Response } from "express";
interface CreateSuperAdminRequest extends Request {
    body: {
        name: string;
        email: string;
        password: string;
    };
}
export declare const createSuperAdmin: (req: CreateSuperAdminRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllAdmins: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllUsers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllLands: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllBuildings: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllTransactions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=super.admin.controller.d.ts.map