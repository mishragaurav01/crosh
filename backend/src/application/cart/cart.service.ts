import { CartRepository } from '../../app/repositories/cart.repository.js';
import { ProductRepository } from '../../app/repositories/product.repository.js';
import { VariantRepository } from '../../app/repositories/variant.repository.js';
import { PriceRepository } from '../../app/repositories/pricing.repository.js';
import { InventoryRepository } from '../../app/repositories/inventory.repository.js';
import { CouponService } from '../coupon/coupon.service.js';
import { CartMapper, type CartResponse, type CartItemResponse, type CartDocument } from '../../domain/cart/index.js';
import { NotFoundError, ValidationError } from '../../shared/errors/index.js';
import { Types } from 'mongoose';

export class CartService {
    constructor(
        private cartRepo = new CartRepository(),
        private productRepo = new ProductRepository(),
        private variantRepo = new VariantRepository(),
        private priceRepo = new PriceRepository(),
        private inventoryRepo = new InventoryRepository(),
        private couponService = new CouponService()
    ) { }

    private async getOrCreateCart(userId?: string, guestId?: string): Promise<CartDocument> {
        let cart = null;
        if (userId) {
            cart = await this.cartRepo.getByUserId(userId);
        } else if (guestId) {
            cart = await this.cartRepo.getByGuestId(guestId);
        }

        if (!cart) {
            cart = await this.cartRepo.create({ userId: userId ? new Types.ObjectId(userId) : undefined, guestId, items: [] });
        }
        return cart;
    }

    async calculateCart(cart: CartDocument): Promise<CartResponse> {
        const itemResponses: CartItemResponse[] = [];
        let subTotal = 0;

        for (const item of cart.items) {
            const product = await this.productRepo.findById(item.productId.toString());
            const variant = await this.variantRepo.findById(item.variantId.toString());

            let price = 0;
            if (variant) {
                const pricing = await this.priceRepo.findByVariantIdAndCurrency(item.variantId.toString(), 'INR');
                if (pricing) {
                    price = pricing.salePrice ?? pricing.basePrice;
                }
            }

            const total = price * item.quantity;
            subTotal += total;

            itemResponses.push({
                productId: item.productId.toString(),
                variantId: item.variantId.toString(),
                quantity: item.quantity,
                product: product ? { id: product._id, name: product.name, slug: product.slug } : null,
                variant: variant ? { id: variant._id, sku: variant.sku, attributes: variant.attributes } : null,
                price,
                total
            });
        }

        let discountAmount = 0;
        let couponResponse = undefined;

        if (cart.couponId) {
            try {
                // Find populated coupon via schema reference, or fetch it via service manually
                // We'll trust the stored ID and resolve it again in service to validate live limits
                const couponDoc = (cart as any).couponId;
                if (couponDoc && couponDoc.code) {
                    couponResponse = await this.couponService.validateCoupon(couponDoc.code, subTotal);

                    if (couponResponse.type === 'Percentage') {
                        discountAmount = subTotal * (couponResponse.value / 100);
                    } else {
                        discountAmount = couponResponse.value;
                    }

                    if (discountAmount > subTotal) {
                        discountAmount = subTotal;
                    }
                }
            } catch (err) {
                // if coupon became invalid since last application, strip it silently here vs throwing
                cart.couponId = undefined;
                await this.cartRepo.save(cart);
            }
        }

        const total = subTotal - discountAmount;

        return CartMapper.toResponse(cart, itemResponses, subTotal, discountAmount, total, couponResponse);
    }

    async getCart(userId?: string, guestId?: string): Promise<CartResponse> {
        if (!userId && !guestId) throw new ValidationError('Auth or guest session required');
        const cart = await this.getOrCreateCart(userId, guestId);
        return this.calculateCart(cart);
    }

    async addItem(productId: string, variantId: string, quantity: number, userId?: string, guestId?: string): Promise<CartResponse> {
        const product = await this.productRepo.findById(productId);
        if (!product || product.status !== 'Active') throw new NotFoundError('Product not available');

        const variant = await this.variantRepo.findById(variantId);
        if (!variant || variant.productId.toString() !== productId) throw new NotFoundError('Variant mismatch');

        const inventory = await this.inventoryRepo.findByVariantId(variantId);
        if (!inventory) throw new ValidationError('Inventory not found for variant');

        const cart = await this.getOrCreateCart(userId, guestId);

        const existingItem = cart.items.find(i => i.variantId.toString() === variantId);
        const newQty = (existingItem?.quantity || 0) + quantity;

        if (newQty > inventory.availableQuantity) {
            throw new ValidationError(`Cannot add ${quantity} item(s). Only ${inventory.availableQuantity} available.`);
        }

        if (existingItem) {
            existingItem.quantity = newQty;
        } else {
            cart.items.push({
                productId: new Types.ObjectId(productId),
                variantId: new Types.ObjectId(variantId),
                quantity
            } as any);
        }

        await this.cartRepo.save(cart);
        return this.calculateCart(cart);
    }

    async updateItemQuantity(variantId: string, quantity: number, userId?: string, guestId?: string): Promise<CartResponse> {
        if (quantity <= 0) return this.removeItem(variantId, userId, guestId);

        const inventory = await this.inventoryRepo.findByVariantId(variantId);
        if (!inventory) throw new ValidationError('Inventory unavailable');
        if (quantity > inventory.availableQuantity) {
            throw new ValidationError(`Only ${inventory.availableQuantity} available.`);
        }

        const cart = await this.getOrCreateCart(userId, guestId);
        const existingItem = cart.items.find(i => i.variantId.toString() === variantId);
        if (!existingItem) throw new NotFoundError('Item not in cart');

        existingItem.quantity = quantity;
        await this.cartRepo.save(cart);
        return this.calculateCart(cart);
    }

    async removeItem(variantId: string, userId?: string, guestId?: string): Promise<CartResponse> {
        const cart = await this.getOrCreateCart(userId, guestId);
        cart.items = cart.items.filter(i => i.variantId.toString() !== variantId) as any;
        await this.cartRepo.save(cart);
        return this.calculateCart(cart);
    }

    async clearCart(userId?: string, guestId?: string): Promise<CartResponse> {
        const cart = await this.getOrCreateCart(userId, guestId);
        cart.items = [];
        cart.couponId = undefined;
        await this.cartRepo.save(cart);
        return this.calculateCart(cart);
    }

    async applyCoupon(code: string, userId?: string, guestId?: string): Promise<CartResponse> {
        const cart = await this.getOrCreateCart(userId, guestId);
        const calculated = await this.calculateCart(cart); // get current subTotal

        const validCoupon = await this.couponService.validateCoupon(code, calculated.subTotal);
        cart.couponId = new Types.ObjectId(validCoupon.id);
        await this.cartRepo.save(cart);

        return this.calculateCart(cart);
    }

    async removeCoupon(userId?: string, guestId?: string): Promise<CartResponse> {
        const cart = await this.getOrCreateCart(userId, guestId);
        cart.couponId = undefined;
        await this.cartRepo.save(cart);
        return this.calculateCart(cart);
    }

    async mergeGuestCart(guestId: string, userId: string): Promise<CartResponse> {
        const guestCart = await this.cartRepo.getByGuestId(guestId);
        if (!guestCart || guestCart.items.length === 0) {
            return this.getCart(userId);
        }

        const userCart = await this.getOrCreateCart(userId);

        for (const item of guestCart.items) {
            const existing = userCart.items.find(i => i.variantId.toString() === item.variantId.toString());
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                userCart.items.push(item);
            }
        }

        if (guestCart.couponId && !userCart.couponId) {
            userCart.couponId = guestCart.couponId;
        }

        await this.cartRepo.save(userCart);
        await this.cartRepo.delete(guestCart._id.toString());

        return this.calculateCart(userCart);
    }
}
