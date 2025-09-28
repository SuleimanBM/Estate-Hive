import mongoose, { Document, Schema, Types } from 'mongoose';

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

const TransactionSchema: Schema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: Number,
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'cash', 'mobile-money'],
    default: 'credit_card'
  },
  propertyOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  type: {
    type: String,
    enum: ['purchase', 'rent', 'lease']
  },
  startDate: Date,
  endDate: Date
}, { timestamps: true });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);