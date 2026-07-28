import { RoleModel } from '../../domain/role/index.js';
import type { Role, RoleDocument } from '../../domain/role/index.js';

export class RoleRepository {
  async create(data: Role): Promise<RoleDocument> {
    const role = new RoleModel(data);
    return role.save();
  }

  async findById(id: string): Promise<RoleDocument | null> {
    return RoleModel.findById(id).exec();
  }

  async findByName(name: string): Promise<RoleDocument | null> {
    return RoleModel.findOne({ name }).exec();
  }

  async findAll(): Promise<RoleDocument[]> {
    return RoleModel.find().exec();
  }

  async update(
    id: string,
    updateData: Partial<Role>,
  ): Promise<RoleDocument | null> {
    return RoleModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<RoleDocument | null> {
    return RoleModel.findByIdAndDelete(id).exec();
  }
}
