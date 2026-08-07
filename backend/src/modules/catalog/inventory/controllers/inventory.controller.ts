import type { Request, Response, NextFunction } from 'express';
import { InventoryService } from '../../../../application/inventory/inventory.service.js';

const inventoryService = new InventoryService();

export class InventoryController {
  static async getInventory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const variantId = req.params.variantId as string;
      const inventory = await inventoryService.getInventory(variantId);
      res.status(200).json({ success: true, data: inventory });
    } catch (error) {
      next(error);
    }
  }

  static async addStock(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const inventory = await inventoryService.addStock(
        req.body.variantId,
        req.body.amount,
      );
      res.status(200).json({ success: true, data: inventory });
    } catch (error) {
      next(error);
    }
  }

  static async reserveStock(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const inventory = await inventoryService.reserveStock(
        req.body.variantId,
        req.body.amount,
      );
      res.status(200).json({ success: true, data: inventory });
    } catch (error) {
      next(error);
    }
  }

  static async releaseStock(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const inventory = await inventoryService.releaseStock(
        req.body.variantId,
        req.body.amount,
      );
      res.status(200).json({ success: true, data: inventory });
    } catch (error) {
      next(error);
    }
  }

  static async adjustStock(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const inventory = await inventoryService.adjustStock(
        req.body.variantId,
        req.body.quantity,
      );
      res.status(200).json({ success: true, data: inventory });
    } catch (error) {
      next(error);
    }
  }
}
