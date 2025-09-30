import { Request, Response } from "express";
export declare function registerHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function verifyEmailHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function loginHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function refreshHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function logoutHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare const forgotPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const resetPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map