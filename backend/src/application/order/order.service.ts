import { OrderRepository } from '../../app/repositories/order.repository.js';
import { InventoryRepository } from '../../app/repositories/inventory.repository.js';
import { CartService } from '../cart/cart.service.js';
import { AddressRepository } from '../../app/repositories/address.repository.js';
import { CouponRepository } from '../../app/repositories/coupon.repository.js';
import { OrderMapper, type OrderResponse } from '../../domain/order/index.js';
import { ValidationError, NotFoundError } from '../../shared/errors/index.js';
import { Types } from 'mongoose';

export class OrderService {
    constructor(
        private orderRepo = new OrderRepository(),
        private inventoryRepo = new InventoryRepository(),
        private addressRepo = new AddressRepository(),
        private cartService = new CartService(),
        private couponRepo = new CouponRepository()
    ) { }

    async placeOrder(userId: string, addressId: string): Promise<OrderResponse> {
        const address = await this.addressRepo.findById(addressId);
        if (!address || address.userId.toString() !== userId) {
            throw new ValidationError('Valid Address is required');
        }

        const cart = await this.cartService.getCart(userId);
        if (!cart.items || cart.items.length === 0) {
            throw new ValidationError('Cart is empty');
        }

        // 1. Snapshot Cart & Validate Inventory
        const orderItems = [];
        for (const item of cart.items) {
            const inventory = await this.inventoryRepo.findByVariantId(item.variantId);
            if (!inventory) throw new ValidationError(`Inventory unavailable for variant ${item.variant?._id}`);

            if (item.quantity > inventory.availableQuantity) {
                throw new ValidationError(`Insufficient stock for ${item.product?.name}`);
            }

            orderItems.push({
                productId: new Types.ObjectId(item.productId),
                variantId: new Types.ObjectId(item.variantId),
                sku: item.variant?.sku || 'UNKNOWN',
                name: item.product?.name || 'UNKNOWN',
                quantity: item.quantity,
                price: item.price,
                total: item.total
            });
        }

        // 2. Lock Inventory (Deduct stock) - Basic pessimistic transaction alternative
        // Note: In real production, this requires a DB transaction session to rollback on failure
        for (const item of orderItems) {
            const inventory = await this.inventoryRepo.findByVariantId(item.variantId.toString());
            if (inventory) {
                inventory.availableQuantity -= item.quantity;
                await inventory.save();
            }
        }

        // 3. Create Order
        const order = await this.orderRepo.create({
            userId: new Types.ObjectId(userId),
            addressId: new Types.ObjectId(addressId),
            items: orderItems,
            couponId: cart.coupon ? new Types.ObjectId(cart.coupon.id) : undefined,
            subTotal: cart.subTotal,
            discountAmount: cart.discountAmount,
            total: cart.total,
            status: 'Pending',
            statusHistory: [{ status: 'Pending', timestamp: new Date() }]
        });

        if (cart.coupon) {
            await this.couponRepo.incrementUsage(cart.coupon.id);
        }

        // 4. Empty Cart
        await this.cartService.clearCart(userId);

        return OrderMapper.toResponse(order);
    }

    async getOrder(userId: string, orderId: string, isAdmin = false): Promise<OrderResponse> {
        const order = await this.orderRepo.findById(orderId);
        if (!order) throw new NotFoundError('Order not found');
        if (!isAdmin && order.userId.toString() !== userId) throw new ValidationError('Unauthorized');

        return OrderMapper.toResponse(order);
    }

    async getUserOrders(userId: string): Promise<OrderResponse[]> {
        const orders = await this.orderRepo.findByUserId(userId);
        return orders.map(OrderMapper.toResponse);
    }

    async getAllOrders(): Promise<OrderResponse[]> {
        const orders = await this.orderRepo.findAll();
        return orders.map(OrderMapper.toResponse);
    }

    async cancelOrder(userId: string, orderId: string, isAdmin = false): Promise<OrderResponse> {
        const order = await this.orderRepo.findById(orderId);
        if (!order) throw new NotFoundError('Order not found');
        if (!isAdmin && order.userId.toString() !== userId) throw new ValidationError('Unauthorized');
        if (['Shipped', 'Delivered', 'Cancelled', 'Returned', 'Refunded'].includes(order.status)) {
            throw new ValidationError(`Cannot cancel order in ${order.status} state`);
        }

        const updated = await this.orderRepo.updateStatus(orderId, 'Cancelled');

        // Restock inventory
        for (const item of updated!.items) {
            const inventory = await this.inventoryRepo.findByVariantId(item.variantId.toString());
            if (inventory) {
                inventory.availableQuantity += item.quantity;
                await inventory.save();
            }
        }

        return OrderMapper.toResponse(updated!);
    }

    async updateOrderStatus(orderId: string, status: string): Promise<OrderResponse> {
        const updated = await this.orderRepo.updateStatus(orderId, status);
        if (!updated) throw new NotFoundError('Order not found');
        return OrderMapper.toResponse(updated);
    }
}
