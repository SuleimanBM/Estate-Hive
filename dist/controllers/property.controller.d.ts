import { Request, Response } from "express";
export declare function getPresignedUrlHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getFileHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function createPropertyHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getPropertiesHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getPropertyHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updatePropertyHandler(req: Request, res: Response): Promise<void>;
export declare function deletePropertyHandler(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=property.controller.d.ts.map