import mongoose, { Document, Schema } from "mongoose";

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

const adminSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetTokenCode: {
        type: String
    },
    resetTokenExpiry: {
        type: Date
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    bankDetails: {
        accountNumber: { type: String },
        bankName: { type: String },
        accountName: { type: String },
    },
    mobileMoneyDetails: {
        provider: { type: String },
        accountNumber: { type: String },
        accountName: { type: String },
    },
}, {
    timestamps: true
});

const Admin = mongoose.model < IAdmin > ("Admin", adminSchema);

export default Admin;