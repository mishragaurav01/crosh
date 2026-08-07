import type { AddressDocument, AddressResponse } from './address.types.js';

export class AddressMapper {
    static toResponse(doc: AddressDocument): AddressResponse {
        return {
            id: String(doc._id),
            fullName: doc.fullName,
            phoneNumber: doc.phoneNumber,
            street1: doc.street1,
            street2: doc.street2,
            city: doc.city,
            state: doc.state,
            postalCode: doc.postalCode,
            country: doc.country,
            isDefault: doc.isDefault,
        };
    }
}
