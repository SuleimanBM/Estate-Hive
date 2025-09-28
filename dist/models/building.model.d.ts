import mongoose, { Document, Types } from 'mongoose';
export interface ILocation {
    address: string;
    city: string;
    areaType: 'urban' | 'suburban' | 'rural';
}
export interface IUtilities {
    electricity: boolean;
    water: boolean;
    internet: boolean;
    gas: boolean;
}
export interface IBuilding extends Document {
    title: string;
    about: string;
    purpose: 'sale' | 'rent' | 'lease';
    price: number;
    location: ILocation;
    bedrooms: number;
    bathrooms: number;
    propertyAge: 'new' | 'renovated' | 'old';
    status: 'available' | 'sold' | 'rented';
    utilities: IUtilities;
    imageUrl?: string;
    owner: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IBuilding, {}, {}, {}, mongoose.Document<unknown, {}, IBuilding, {}> & IBuilding & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=building.model.d.ts.map