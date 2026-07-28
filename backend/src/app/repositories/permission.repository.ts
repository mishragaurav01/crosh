import { PermissionModel } from '../../domain/permission/index.js';
import type {
  Permission,
  PermissionDocument,
} from '../../domain/permission/index.js';

export class PermissionRepository {
  async create(data: Permission): Promise<PermissionDocument> {
    const permission = new PermissionModel(data);
    return permission.save();
  }

  async findById(id: string): Promise<PermissionDocument | null> {
    return PermissionModel.findById(id).exec();
  }

  async findByName(name: string): Promise<PermissionDocument | null> {
    return PermissionModel.findOne({ name }).exec();
  }

  async findAll(): Promise<PermissionDocument[]> {
    return PermissionModel.find().exec();
  }

  async update(
    id: string,
    updateData: Partial<Permission>,
  ): Promise<PermissionDocument | null> {
    return PermissionModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();
  }

  async delete(id: string): Promise<PermissionDocument | null> {
    return PermissionModel.findByIdAndDelete(id).exec();
  }
}
