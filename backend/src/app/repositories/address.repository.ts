import { AddressModel } from '../../domain/address/index.js';
import type { AddressDocument } from '../../domain/address/index.js';

export class AddressRepository {
    async create(data: any): Promise<AddressDocument> {
        return AddressModel.create(data);
    }

    async findByUserId(userId: string): Promise<AddressDocument[]> {
        return AddressModel.find({ userId }).exec();
    }

    async findById(id: string): Promise<AddressDocument | null> {
        return AddressModel.findById(id).exec();
    }

    async update(id: string, data: any): Promise<AddressDocument | null> {
        return AddressModel.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
    }

    async clearDefault(userId: string): Promise<void> {
        await AddressModel.updateMany({ userId }, { $set: { isDefault: false } }).exec();
    }

    async delete(id: string): Promise<void> {
        await AddressModel.findByIdAndDelete(id).exec();
    }
}
