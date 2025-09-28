import mongoose, { Document } from "mongoose";
export interface IBankDetails {
    accountNumber?: string;
    bankName?: string;
    accountName?: string;
}
export interface IMobileMoneyDetails {
    provider?: string;
    accountNumber?: string;
    accountName?: string;
}
export interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    resetTokenCode?: string;
    resetTokenExpiry?: Date;
    isAdmin: boolean;
    bankDetails: IBankDetails;
    mobileMoneyDetails: IMobileMoneyDetails;
    createdAt: Date;
    updatedAt: Date;
}
declare const Admin: mongoose.Model<IAdmin, {}, {}, {}, mongoose.Document<unknown, {}, IAdmin, {}> & IAdmin & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Admin;
//# sourceMappingURL=admin.model.d.ts.map