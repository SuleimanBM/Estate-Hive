import { Request, Response } from "express";
interface CreateAdminRequest extends Request {
    body: {
        name: string;
        email: string;
        password: string;
    };
}
interface LoginAdminRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}
interface ForgotPasswordRequest extends Request {
    body: {
        email: string;
    };
}
interface VerifyResetCodeRequest extends Request {
    body: {
        email: string;
        resetTokenCode: string;
        newPassword: string;
    };
}
export declare const createAdmin: (req: CreateAdminRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const loginAdmin: (req: LoginAdminRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const logoutAdmin: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const forgotPasswordCodeGeneration: (req: ForgotPasswordRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const verifyResetCode: (req: VerifyResetCodeRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=admin.controller.d.ts.map