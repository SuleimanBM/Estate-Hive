import { Request, Response } from "express";
import { ILand } from "../src/models/land.model.js";
import { IBuilding } from "../src/models/building.model.js";
interface CreateLandRequest extends Request {
    body: ILand;
}
interface CreateBuildingRequest extends Request {
    body: IBuilding;
}
interface EditPropertyRequest extends Request {
    params: {
        id: string;
    };
    body: {
        updatedData: Partial<ILand> | Partial<IBuilding>;
    };
}
interface DeletePropertyRequest extends Request {
    params: {
        id: string;
    };
}
export declare const createLand: (req: CreateLandRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createBuilding: (req: CreateBuildingRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllLands: (req: Request, res: Response) => Promise<void>;
export declare const getAllBuildings: (req: Request, res: Response) => Promise<void>;
export declare const editLandById: (req: EditPropertyRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const editBuildingById: (req: EditPropertyRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteLandById: (req: DeletePropertyRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteBuildingById: (req: DeletePropertyRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const uploadLandImage: (req: Request, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=property.controller.d.ts.map