import { PriceModel } from '../../domain/pricing/pricing.schema.js';
import type { PriceDocument } from '../../domain/pricing/pricing.types.js';

export class PriceRepository {
  async create(data: Partial<PriceDocument>): Promise<PriceDocument> {
    const price = new PriceModel(data);
    return await price.save();
  }

  async findByVariantId(variantId: string): Promise<PriceDocument[]> {
    return await PriceModel.find({ variantId });
  }

  async findByVariantIdAndCurrency(
    variantId: string,
    currency: string,
  ): Promise<PriceDocument | null> {
    return await PriceModel.findOne({ variantId, currency });
  }

  async findById(id: string): Promise<PriceDocument | null> {
    return await PriceModel.findById(id);
  }

  async update(
    id: string,
    data: Partial<PriceDocument>,
  ): Promise<PriceDocument | null> {
    return await PriceModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const res = await PriceModel.findByIdAndDelete(id);
    return res !== null;
  }
}
