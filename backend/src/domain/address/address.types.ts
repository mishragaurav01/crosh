import { Types, Document } from 'mongoose';

export interface Address {
    userId: Types.ObjectId | string;
    fullName: string;
    phoneNumber: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
}

export interface AddressDocument extends Address, Document {
    _id: Types.ObjectId;
}

export type AddressResponse = Omit<Address, 'userId'> & {
    id: string;
};
