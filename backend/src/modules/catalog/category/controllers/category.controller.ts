import type { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../../../../application/category/category.service.js';

export class CategoryController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new CategoryService();
      const result = await service.createCategory(req.body);
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
      const service = new CategoryService();
      // Only admins see all; public might see only active
      const activeOnly = req.user?.roles ? false : true;
      const result = await service.getCategories(activeOnly);
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
      const service = new CategoryService();
      const result = await service.getCategory(req.params.id as string);
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
      const service = new CategoryService();
      const result = await service.updateCategory(
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
      const service = new CategoryService();
      const result = await service.deleteCategory(req.params.id as string);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
