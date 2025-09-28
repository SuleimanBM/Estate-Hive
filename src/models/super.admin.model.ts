import mongoose, { Document, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const allowedEmail = process.env.EMAIL_USER;

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

const superAdminSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string): boolean {
                return value === allowedEmail;
            },
            message: "You must have special access"
        },
    },
    password: {
        type: String,
        required: true
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
    }
});

const SuperAdmin = mongoose.model<ISuperAdmin>("superAdmin", superAdminSchema);

export default SuperAdmin;