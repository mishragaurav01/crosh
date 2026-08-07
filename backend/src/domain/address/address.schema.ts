import { Schema, model } from 'mongoose';
import type { AddressDocument } from './address.types.js';

export const addressSchema = new Schema<AddressDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        fullName: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        street1: { type: String, required: true },
        street2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
    },
    { timestamps: true }
);

addressSchema.index({ userId: 1 });

export const AddressModel = model<AddressDocument>('Address', addressSchema);
