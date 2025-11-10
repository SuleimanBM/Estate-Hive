import { Request, Response } from "express";
export declare function createSuperAdmin(req: Request, res: Response): Promise<void>;
export declare function getAllAdmins(req: Request, res: Response): Promise<void>;
export declare function getAllUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateUser(req: Request, res: Response): Promise<void>;
export declare function deleteUser(req: Request, res: Response): Promise<void>;
export declare function getAllProperties(req: Request, res: Response): Promise<void>;
export declare function updateProperty(req: Request, res: Response): Promise<void>;
export declare function deleteProperty(req: Request, res: Response): Promise<void>;
export declare function getAllApplications(req: Request, res: Response): Promise<void>;
export declare function overrideApplicationStatus(req: Request, res: Response): Promise<void>;
export declare function getAllLeases(req: Request, res: Response): Promise<void>;
export declare function overrideLease(req: Request, res: Response): Promise<void>;
export declare function deleteLease(req: Request, res: Response): Promise<void>;
export declare function getAllPayments(req: Request, res: Response): Promise<void>;
export declare function overridePayment(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=super.admin.controller.d.ts.map