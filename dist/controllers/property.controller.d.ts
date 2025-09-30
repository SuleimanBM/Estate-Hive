import { NextFunction, Request, Response } from "express";
export declare function create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function remove(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=property.controller.d.ts.map