import { Document, Types } from 'mongoose';

export type VariantStatus = 'Active' | 'Draft' | 'Archived';

export interface VariantAttributes {
  color?: string;
  size?: string;
  [key: string]: string | undefined;
}

export interface VariantDimensions {
  length?: number;
  width?: number;
  height?: number;
  unit?: string;
}

export interface Variant {
  productId: Types.ObjectId | string;
  sku: string;
  attributes?: VariantAttributes;
  barcode?: string;
  weight?: number;
  dimensions?: VariantDimensions;
  status: VariantStatus;
  isDeleted: boolean;
  deletedAt?: Date;
}

export interface VariantDocument extends Document {
  _id: Types.ObjectId;
  productId: Types.ObjectId | string;
  sku: string;
  attributes?: VariantAttributes;
  barcode?: string;
  weight?: number;
  dimensions?: VariantDimensions;
  status: VariantStatus;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface VariantResponse {
  id: string;
  productId: string;
  sku: string;
  attributes?: VariantAttributes;
  barcode?: string;
  weight?: number;
  dimensions?: VariantDimensions;
  status: VariantStatus;
  createdAt: Date;
  updatedAt: Date;
}
