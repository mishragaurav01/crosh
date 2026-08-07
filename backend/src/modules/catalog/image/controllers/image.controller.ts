import type { Request, Response, NextFunction } from 'express';
import { ImageService } from '../../../../application/image/image.service.js';

export class ImageController {
  static async uploadProductImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new ImageService();
      const productId = req.params.id as string;

      const file = req.file;
      if (!file) {
        res
          .status(400)
          .json({ success: false, message: 'Image file required' });
        return;
      }

      const altText = req.body.altText;
      const sortOrder = req.body.sortOrder
        ? parseInt(req.body.sortOrder, 10)
        : 0;
      const isThumbnail = req.body.isThumbnail === 'true';

      const response = await service.uploadProductImage(productId, file, {
        altText,
        sortOrder,
        isThumbnail,
      });
      res.status(201).json({ success: true, data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getProductImages(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new ImageService();
      const productId = req.params.id as string;
      const response = await service.getProductImages(productId);
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      next(error);
    }
  }

  static async updateImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new ImageService();
      const imageId = req.params.id as string;
      const response = await service.updateImage(imageId, req.body);
      res.status(200).json({ success: true, data: response });
    } catch (error) {
      next(error);
    }
  }

  static async deleteImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const service = new ImageService();
      const imageId = req.params.id as string;
      await service.removeImage(imageId);
      res
        .status(200)
        .json({ success: true, message: 'Image deleted sequentially' });
    } catch (error) {
      next(error);
    }
  }
}
