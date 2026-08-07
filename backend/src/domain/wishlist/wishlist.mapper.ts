import type { WishlistDocument, WishlistResponse } from './wishlist.types.js';

export class WishlistMapper {
    static toResponse(doc: WishlistDocument): WishlistResponse {
        return {
            id: String(doc._id),
            userId: String(doc.userId),
            // we'll allow front-end to receive populated items or regular strings
            items: doc.items.map(item => {
                if (typeof item === 'object' && item !== null && '_id' in item) {
                    const product = item as any;
                    return {
                        id: product._id.toString(),
                        name: product.name,
                        slug: product.slug,
                        status: product.status,
                        price: product.price // Virtual or logic
                    };
                }
                return String(item);
            }),
        };
    }
}
