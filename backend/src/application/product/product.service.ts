import { ProductRepository } from '../../app/repositories/product.repository.js';
import { CategoryRepository } from '../../app/repositories/category.repository.js';
import { CollectionRepository } from '../../app/repositories/collection.repository.js';
import { ProductMapper } from '../../domain/product/index.js';
import type { Product, ProductResponse } from '../../domain/product/index.js';
import { ConflictError, NotFoundError, ValidationError } from '../../shared/errors/index.js';

export class ProductService {
    private repository = new ProductRepository();
    private categoryRepo = new CategoryRepository();
    private collectionRepo = new CollectionRepository();

    async createProduct(data: Product): Promise<ProductResponse> {
        const existing = await this.repository.findBySlug(data.slug);
        if (existing) {
            throw new ConflictError('Product slug must be unique');
        }

        const category = await this.categoryRepo.findById(data.category.toString());
        if (!category) {
            throw new ValidationError('Valid Category is required');
        }

        if (data.status === 'Active' && !category.isActive) {
            throw new ValidationError('Cannot publish a product in an inactive category');
        }

        if (data.collectionAssigned) {
            const collection = await this.collectionRepo.findById(data.collectionAssigned.toString());
            if (!collection) throw new ValidationError('Invalid Collection ID');
            if (data.status === 'Active' && !collection.isActive) {
                throw new ValidationError('Cannot publish a product in an inactive collection');
            }
        }

        const created = await this.repository.create(data);
        const populated = (await this.repository.findById(created._id.toString()))!;
        return ProductMapper.toResponse(populated);
    }

    async getProduct(id: string): Promise<ProductResponse> {
        const product = await this.repository.findById(id);
        if (!product) throw new NotFoundError('Product not found');
        return ProductMapper.toResponse(product);
    }

    async getProductBySlug(slug: string): Promise<ProductResponse> {
        const product = await this.repository.findBySlug(slug);
        if (!product) throw new NotFoundError('Product not found');
        return ProductMapper.toResponse(product);
    }

    async getProducts(activeOnly = false): Promise<ProductResponse[]> {
        const query = activeOnly ? { status: 'Active' } : {};
        const products = await this.repository.findAll(query);
        return products.map(ProductMapper.toResponse);
    }

    async updateProduct(id: string, data: Partial<Product>): Promise<ProductResponse> {
        if (data.slug) {
            const existing = await this.repository.findBySlug(data.slug);
            if (existing && existing._id.toString() !== id) {
                throw new ConflictError('Product slug must be unique');
            }
        }

        if (data.category) {
            const category = await this.categoryRepo.findById(data.category.toString());
            if (!category) throw new ValidationError('Valid Category is required');
        }

        const updated = await this.repository.update(id, data);
        if (!updated) throw new NotFoundError('Product not found');
        return ProductMapper.toResponse(updated);
    }

    async deleteProduct(id: string): Promise<ProductResponse> {
        const product = await this.repository.findById(id);
        if (!product) throw new NotFoundError('Product not found');

        const deleted = await this.repository.delete(id);
        return ProductMapper.toResponse(deleted!);
    }
}
