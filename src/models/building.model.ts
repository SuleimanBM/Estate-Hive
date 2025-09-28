import mongoose, { Document, Schema, Types } from 'mongoose';

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

const buildingSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    enum: ['sale', 'rent', 'lease'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true,
      unique: true
    },
    city: {
      type: String,
      required: true
    },
    areaType: {
      type: String,
      enum: ['urban', 'suburban', 'rural'],
      default: 'urban'
    }
  },
  bedrooms: {
    type: Number,
    default: 1
  },
  bathrooms: {
    type: Number,
    default: 1
  },
  propertyAge: {
    type: String,
    enum: ['new', 'renovated', 'old'],
    default: 'new'
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'rented'],
    default: 'available'
  },
  utilities: {
    electricity: {
      type: Boolean,
      default: true
    },
    water: {
      type: Boolean,
      default: true
    },
    internet: {
      type: Boolean,
      default: true
    },
    gas: {
      type: Boolean,
      default: false
    }
  },
  imageUrl: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, { timestamps: true });

export default mongoose.model<IBuilding>('Building', buildingSchema);