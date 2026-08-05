/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response, NextFunction } from 'express';
import { ProductService } from '../../../../application/product/product.service.js';

export class ProductController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new ProductService();
            const result = await service.createProduct(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new ProductService();
            const activeOnly = (req as any).user?.roles ? false : true;
            const result = await service.getProducts(activeOnly);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new ProductService();
            const result = await service.getProduct((req.params.id as string));
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }

    static async getBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new ProductService();
            const result = await service.getProductBySlug((req.params.slug as string));
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new ProductService();
            const result = await service.updateProduct((req.params.id as string), req.body);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const service = new ProductService();
            const result = await service.deleteProduct((req.params.id as string));
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }
}
