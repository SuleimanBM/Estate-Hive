import mongoose, { Document, Types } from 'mongoose';
export interface ITransaction extends Document {
    property?: Types.ObjectId;
    buyer?: Types.ObjectId;
    amount: number;
    paymentMethod: 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash' | 'mobile-money';
    propertyOwner?: Types.ObjectId;
    status: 'pending' | 'completed' | 'cancelled';
    type: 'purchase' | 'rent' | 'lease';
    startDate?: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ITransaction, {}, {}, {}, mongoose.Document<unknown, {}, ITransaction, {}> & ITransaction & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=transaction.model.d.ts.map