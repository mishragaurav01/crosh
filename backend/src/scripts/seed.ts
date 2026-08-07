import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CategoryModel } from '../domain/category/index.js';
import { CollectionModel } from '../domain/collection/index.js';
import { ProductModel } from '../domain/product/index.js';
import { VariantModel } from '../domain/variant/index.js';
import { InventoryModel } from '../domain/inventory/index.js';
import { PriceModel } from '../domain/pricing/index.js';
import { ImageModel } from '../domain/image/index.js';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/crosh';

const seedData = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        // Clear existing data
        await CategoryModel.deleteMany({});
        await CollectionModel.deleteMany({});
        await ProductModel.deleteMany({});
        await VariantModel.deleteMany({});
        await InventoryModel.deleteMany({});
        await PriceModel.deleteMany({});
        await ImageModel.deleteMany({});
        console.log('Cleared existing catalog data.');

        // 1. Categories
        const catHomeDecor = await CategoryModel.create({ name: 'Home Decor', slug: 'home-decor', description: 'Cozy crochet for your space', isActive: true });
        const catBouquets = await CategoryModel.create({ name: 'Bouquets', slug: 'bouquets', description: 'Forever flowers', isActive: true });
        const catKeychains = await CategoryModel.create({ name: 'Keychains', slug: 'keychains', description: 'Cute companions', isActive: true });
        const catGiftHampers = await CategoryModel.create({ name: 'Gift Hampers', slug: 'gift-hampers', description: 'Bundles of joy', isActive: true });

        // 2. Collections
        const colBestSellers = await CollectionModel.create({ name: 'Best Sellers', slug: 'best-sellers', description: 'Our most loved items', isActive: true });
        const colNewArrivals = await CollectionModel.create({ name: 'New Arrivals', slug: 'new-arrivals', description: 'Freshly crocheted', isActive: true });
        const colFestive = await CollectionModel.create({ name: 'Festive Collection', slug: 'festive-collection', description: 'Celebrate with warmth', isActive: true });
        const colMinimal = await CollectionModel.create({ name: 'Minimal Collection', slug: 'minimal-collection', description: 'Simple aesthetics', isActive: true });

        // 3. Products Helper
        const createFullProduct = async (
            name: string, slug: string, sku: string, catId: string, colId: string, price: number, stock: number
        ) => {
            const product = await ProductModel.create({
                name,
                slug,
                description: `This is a beautiful ${name.toLowerCase()} meticulously handcrafted using premium materials. Perfect as a gift or personal keepsake.`,
                shortDescription: `Handmade ${name.toLowerCase()}`,
                category: catId,
                collectionAssigned: colId,
                status: 'Active',
                featured: true,
                seo: { title: name, description: `Buy ${name}`, keywords: ['crochet', name.toLowerCase()] }
            });

            const variant = await VariantModel.create({
                productId: product._id,
                sku: sku,
                attributes: { size: 'Regular' },
                weight: 200,
                dimensions: { length: 10, width: 10, height: 10 },
                status: 'Active'
            });

            await ImageModel.create({ productId: product._id, url: 'https://placehold.co/600x600/png?text=Main+Image', altText: name + ' Front', isThumbnail: true, sortOrder: 0 });
            await ImageModel.create({ productId: product._id, url: 'https://placehold.co/600x600/png?text=Side+Angle', altText: name + ' Side', isThumbnail: false, sortOrder: 1 });
            await ImageModel.create({ productId: product._id, url: 'https://placehold.co/600x600/png?text=Detail+Shot', altText: name + ' Detail', isThumbnail: false, sortOrder: 2 });

            await InventoryModel.create({
                variantId: variant._id,
                quantity: stock,
                availableQuantity: stock,
                reservedQuantity: 0,
                lowStockThreshold: 5,
                trackInventory: true
            });

            await PriceModel.create({
                variantId: variant._id,
                basePrice: price,
                salePrice: price * 0.9,
                currency: 'INR'
            });

            console.log(`Seeded: ${name}`);
        };

        // Seed 10 specific products
        await createFullProduct('Crochet Sunflower Pot', 'crochet-sunflower-pot', 'HD-SUN-01', catHomeDecor.id, colBestSellers.id, 499, 20);
        await createFullProduct('Crochet Lavender Pot', 'crochet-lavender-pot', 'HD-LAV-01', catHomeDecor.id, colMinimal.id, 599, 15);
        await createFullProduct('Crochet Tulip Pot', 'crochet-tulip-pot', 'HD-TUL-01', catHomeDecor.id, colNewArrivals.id, 449, 30);
        await createFullProduct('Red Rose Bouquet', 'red-rose-bouquet', 'BQ-RRO-01', catBouquets.id, colFestive.id, 1299, 10);
        await createFullProduct('Sunflower Bouquet', 'sunflower-bouquet', 'BQ-SUN-01', catBouquets.id, colBestSellers.id, 1499, 8);
        await createFullProduct('Lavender Bouquet', 'lavender-bouquet', 'BQ-LAV-01', catBouquets.id, colMinimal.id, 1399, 12);
        await createFullProduct('Panda Keychain', 'panda-keychain', 'KC-PAN-01', catKeychains.id, colNewArrivals.id, 249, 50);
        await createFullProduct('Bee Keychain', 'bee-keychain', 'KC-BEE-01', catKeychains.id, colBestSellers.id, 199, 60);
        await createFullProduct('Birthday Gift Hamper', 'birthday-gift-hamper', 'GH-BTH-01', catGiftHampers.id, colFestive.id, 2499, 5);
        await createFullProduct('Anniversary Gift Box', 'anniversary-gift-box', 'GH-ANN-01', catGiftHampers.id, colFestive.id, 2999, 5);

        console.log('Seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
