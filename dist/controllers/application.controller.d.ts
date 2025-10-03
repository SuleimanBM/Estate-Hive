import { Request, Response } from "express";
export declare function create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function listForTenant(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function listForManager(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function approve(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deny(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function withdraw(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=application.controller.d.ts.map