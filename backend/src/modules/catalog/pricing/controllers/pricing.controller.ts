import type { Request, Response, NextFunction } from 'express';
import { PricingService } from '../../../../application/pricing/pricing.service.js';

const pricingService = new PricingService();

export class PricingController {
  static async getPrices(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const variantId = req.params.variantId as string;
      const prices = await pricingService.getPricesForVariant(variantId);
      res.status(200).json({ success: true, data: prices });
    } catch (error) {
      next(error);
    }
  }

  static async setPrice(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const price = await pricingService.setPrice(req.body.variantId, req.body);
      res.status(201).json({ success: true, data: price });
    } catch (error) {
      next(error);
    }
  }

  static async updatePrice(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      const price = await pricingService.updatePrice(id, req.body);
      res.status(200).json({ success: true, data: price });
    } catch (error) {
      next(error);
    }
  }

  static async deletePrice(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      await pricingService.removePrice(id);
      res.status(200).json({ success: true, message: 'Price deleted' });
    } catch (error) {
      next(error);
    }
  }
}
