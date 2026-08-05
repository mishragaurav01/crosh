import type { Request, Response, NextFunction } from 'express';
import { GetProfileService } from '../../../../application/profile/get-profile.service.js';
import { UpdateProfileService } from '../../../../application/profile/update-profile.service.js';

export class UserController {
  static async getProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const getProfileService = new GetProfileService();
      const userId = req.user!.id;

      const profile = await getProfileService.getProfile(userId);

      res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const updateProfileService = new UpdateProfileService();
      const userId = req.user!.id;

      const updatedProfile = await updateProfileService.updateProfile(
        userId,
        req.body,
      );

      res.status(200).json({
        success: true,
        data: updatedProfile,
      });
    } catch (error) {
      next(error);
    }
  }
}
