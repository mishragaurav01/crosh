import { VariantModel } from '../../domain/variant/variant.schema.js';
import type { VariantDocument } from '../../domain/variant/variant.types.js';

export class VariantRepository {
  async create(data: Partial<VariantDocument>): Promise<VariantDocument> {
    const variant = new VariantModel(data);
    return await variant.save();
  }

  async findById(id: string): Promise<VariantDocument | null> {
    return await VariantModel.findOne({ _id: id, isDeleted: false });
  }

  async findBySku(sku: string): Promise<VariantDocument | null> {
    return await VariantModel.findOne({ sku, isDeleted: false });
  }

  async findByProductId(productId: string): Promise<VariantDocument[]> {
    return await VariantModel.find({ productId, isDeleted: false });
  }

  async update(
    id: string,
    data: Partial<VariantDocument>,
  ): Promise<VariantDocument | null> {
    return await VariantModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      { new: true },
    );
  }

  async softDelete(id: string): Promise<VariantDocument | null> {
    return await VariantModel.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true },
    );
  }
}
