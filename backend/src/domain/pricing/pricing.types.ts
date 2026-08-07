import { Document, Types } from 'mongoose';

export interface Price {
  variantId: Types.ObjectId | string;
  currency: string;
  basePrice: number;
  salePrice?: number;
  costPrice?: number;
  taxClass?: string;
  discount?: number;
  effectiveFrom?: Date;
  effectiveTo?: Date;
}

export interface PriceDocument extends Document {
  _id: Types.ObjectId;
  variantId: Types.ObjectId | string;
  currency: string;
  basePrice: number;
  salePrice?: number;
  costPrice?: number;
  taxClass?: string;
  discount?: number;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceResponse {
  id: string;
  variantId: string;
  currency: string;
  basePrice: number;
  salePrice?: number;
  costPrice?: number;
  taxClass?: string;
  discount?: number;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  createdAt: Date;
  updatedAt: Date;
}
