import { ProductModel } from '../../domain/product/index.js';
import type { Product, ProductDocument } from '../../domain/product/index.js';

export class ProductRepository {
  async create(data: Product): Promise<ProductDocument> {
    const doc = new ProductModel(data);
    return doc.save();
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return ProductModel.findById(id)
      .populate('category collectionAssigned')
      .exec();
  }

  async findBySlug(slug: string): Promise<ProductDocument | null> {
    return ProductModel.findOne({ slug })
      .populate('category collectionAssigned')
      .exec();
  }

  async findAll(
    query: Record<string, unknown> = {},
  ): Promise<ProductDocument[]> {
    return ProductModel.find(query)
      .populate('category collectionAssigned')
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(
    id: string,
    updateData: Partial<Product>,
  ): Promise<ProductDocument | null> {
    return ProductModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    )
      .populate('category collectionAssigned')
      .exec();
  }

  async delete(id: string): Promise<ProductDocument | null> {
    return ProductModel.findByIdAndUpdate(
      id,
      { $set: { status: 'Archived' } },
      { new: true },
    ).exec();
  }

  async search(
    queryText: string,
    filters: Record<string, unknown> = {},
    options: {
      skip?: number;
      limit?: number;
      sort?: Record<string, 1 | -1>;
    } = {},
  ): Promise<{ data: ProductDocument[]; total: number }> {
    const q: Record<string, unknown> = { ...filters, status: 'Active' };

    if (queryText) {
      q.$or = [
        { name: { $regex: queryText, $options: 'i' } },
        { slug: { $regex: queryText, $options: 'i' } },
      ];
    }

    const count = await ProductModel.countDocuments(q);
    const data = await ProductModel.find(q)
      .populate('category collectionAssigned')
      .sort(options.sort || { createdAt: -1 })
      .skip(options.skip || 0)
      .limit(options.limit || 20)
      .exec();

    return { data, total: count };
  }

  async findFeatured(): Promise<ProductDocument[]> {
    return ProductModel.find({ featured: true, status: 'Active' })
      .populate('category collectionAssigned')
      .limit(10)
      .exec();
  }
}
