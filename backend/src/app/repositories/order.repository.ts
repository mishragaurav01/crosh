import { OrderModel } from '../../domain/order/index.js';
import type { OrderDocument } from '../../domain/order/index.js';

export class OrderRepository {
    async create(data: any, options?: any): Promise<OrderDocument> {
        const arr = Array.isArray(data) ? data : [data];
        const created = await OrderModel.create(arr, options);
        return (Array.isArray(created) ? created[0] : created) as any;
    }

    async findById(id: string): Promise<OrderDocument | null> {
        return OrderModel.findById(id).exec();
    }

    async findByUserId(userId: string): Promise<OrderDocument[]> {
        return OrderModel.find({ userId }).sort({ createdAt: -1 }).exec();
    }

    async findAll(): Promise<OrderDocument[]> {
        return OrderModel.find().sort({ createdAt: -1 }).exec();
    }

    async updateStatus(id: string, status: string): Promise<OrderDocument | null> {
        return OrderModel.findByIdAndUpdate(
            id,
            {
                $set: { status },
                $push: { statusHistory: { status, timestamp: new Date() } }
            },
            { new: true }
        ).exec();
    }
}
