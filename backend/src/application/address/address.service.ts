import { AddressRepository } from '../../app/repositories/address.repository.js';
import { AddressMapper, type AddressResponse } from '../../domain/address/index.js';
import { NotFoundError, ValidationError } from '../../shared/errors/index.js';

export class AddressService {
    constructor(private addressRepo = new AddressRepository()) { }

    async createAddress(userId: string, data: any): Promise<AddressResponse> {
        if (data.isDefault) {
            await this.addressRepo.clearDefault(userId);
        }

        const created = await this.addressRepo.create({ ...data, userId });
        return AddressMapper.toResponse(created);
    }

    async getAddresses(userId: string): Promise<AddressResponse[]> {
        const addresses = await this.addressRepo.findByUserId(userId);
        return addresses.map(AddressMapper.toResponse);
    }

    async updateAddress(userId: string, addressId: string, data: any): Promise<AddressResponse> {
        const address = await this.addressRepo.findById(addressId);
        if (!address) throw new NotFoundError('Address not found');
        if (address.userId.toString() !== userId) throw new ValidationError('Unauthorized access to address');

        if (data.isDefault) {
            await this.addressRepo.clearDefault(userId);
        }

        const updated = await this.addressRepo.update(addressId, data);
        return AddressMapper.toResponse(updated!);
    }

    async setAsDefault(userId: string, addressId: string): Promise<AddressResponse> {
        return this.updateAddress(userId, addressId, { isDefault: true });
    }

    async deleteAddress(userId: string, addressId: string): Promise<void> {
        const address = await this.addressRepo.findById(addressId);
        if (!address) throw new NotFoundError('Address not found');
        if (address.userId.toString() !== userId) throw new ValidationError('Unauthorized access to address');

        await this.addressRepo.delete(addressId);
    }
}
