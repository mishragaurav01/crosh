import type { OrderDocument, OrderResponse } from './order.types.js';

export class OrderMapper {
    static toResponse(doc: OrderDocument): OrderResponse {
        return {
            id: String(doc._id),
            userId: String(doc.userId),
            addressId: String(doc.addressId),
            couponId: doc.couponId ? String(doc.couponId) : undefined,
            subTotal: doc.subTotal,
            discountAmount: doc.discountAmount,
            total: doc.total,
            status: doc.status,
            items: doc.items.map(item => ({
                productId: String(item.productId),
                variantId: String(item.variantId),
                sku: item.sku,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.total
            })),
            statusHistory: doc.statusHistory.map(h => ({
                status: h.status,
                timestamp: h.timestamp.toISOString()
            })),
            createdAt: (doc as any).createdAt.toISOString(),
            updatedAt: (doc as any).updatedAt.toISOString(),
        };
    }
}
