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
export interface ISuperAdmin extends Document {
    name: string;
    email: string;
    password: string;
    bankDetails: IBankDetails;
    mobileMoneyDetails: IMobileMoneyDetails;
}
declare const SuperAdmin: mongoose.Model<ISuperAdmin, {}, {}, {}, mongoose.Document<unknown, {}, ISuperAdmin, {}> & ISuperAdmin & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default SuperAdmin;
//# sourceMappingURL=super.admin.model.d.ts.map