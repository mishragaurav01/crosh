import type { Request, Response, NextFunction } from 'express';
import { ProductService } from '../../../../application/product/product.service.js';

export class ProductController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new ProductService();
      const result = await service.createProduct(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new ProductService();
      const activeOnly = req.user?.roles ? false : true;
      const result = await service.getProducts(activeOnly);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new ProductService();
      const result = await service.getProduct(req.params.id as string);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new ProductService();
      const result = await service.getProductBySlug(req.params.slug as string);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new ProductService();
      const result = await service.updateProduct(
        req.params.id as string,
        req.body,
      );
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new ProductService();
      const result = await service.deleteProduct(req.params.id as string);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async search(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new ProductService();
      const query = (req.query.q as string) || '';
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 20;

      const filters: any = {};
      if (req.query.category) filters.category = req.query.category;
      if (req.query.collection)
        filters.collectionAssigned = req.query.collection;

      const result = await service.searchProducts(query, filters, page, limit);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  static async getFeatured(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new ProductService();
      const result = await service.getFeaturedProducts();
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async getNewArrivals(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new ProductService();
      const result = await service.getNewArrivals();
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
