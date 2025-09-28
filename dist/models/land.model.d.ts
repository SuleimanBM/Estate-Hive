import mongoose, { Document, Types } from "mongoose";
export interface ILand extends Document {
    title: string;
    location: string;
    size: number;
    unit: 'sqft' | 'sqm';
    price: number;
    owner: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ILand, {}, {}, {}, mongoose.Document<unknown, {}, ILand, {}> & ILand & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=land.model.d.ts.map