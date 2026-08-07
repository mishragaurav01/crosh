import type { Request, Response, NextFunction } from 'express';
import { VariantService } from '../../../../application/variant/variant.service.js';

const variantService = new VariantService();

export class VariantController {
  static async createVariant(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const productId = req.params.productId as string;
      const variant = await variantService.createVariant(productId, req.body);
      res.status(201).json({ success: true, data: variant });
    } catch (error) {
      next(error);
    }
  }

  static async getVariants(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const productId = req.params.productId as string;
      const variants = await variantService.getVariantsByProductId(productId);
      res.status(200).json({ success: true, data: variants });
    } catch (error) {
      next(error);
    }
  }

  static async updateVariant(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      const variant = await variantService.updateVariant(id, req.body);
      res.status(200).json({ success: true, data: variant });
    } catch (error) {
      next(error);
    }
  }

  static async archiveVariant(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      await variantService.archiveVariant(id);
      res
        .status(200)
        .json({ success: true, message: 'Variant archived safely' });
    } catch (error) {
      next(error);
    }
  }
}
