import { Document, Types } from 'mongoose';

export interface Inventory {
  variantId: Types.ObjectId | string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorder: boolean;
}

export interface InventoryDocument extends Document {
  _id: Types.ObjectId;
  variantId: Types.ObjectId | string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorder: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryResponse {
  id: string;
  variantId: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorder: boolean;
  createdAt: Date;
  updatedAt: Date;
}
