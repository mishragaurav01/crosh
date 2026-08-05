import type { Types, Document } from 'mongoose';

export interface Category {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    isActive: boolean;
    sortOrder: number;
    seo?: { title?: string; description?: string; keywords?: string[] };
}

export interface CategoryDocument extends Category, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoryResponse extends Category {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
