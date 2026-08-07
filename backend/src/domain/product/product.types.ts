import type { Types, Document } from 'mongoose';

export type ProductStatus = 'Draft' | 'Active' | 'Archived';

export interface Product {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  category: Types.ObjectId | string;
  collectionAssigned?: Types.ObjectId | string;
  status: ProductStatus;
  featured: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
    openGraph?: {
      title?: string;
      description?: string;
      image?: string;
      url?: string;
    };
    jsonLd?: string;
  };
}

export interface ProductDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  category: Types.ObjectId | Record<string, unknown>;
  collectionAssigned?: Types.ObjectId | Record<string, unknown>;
  status: ProductStatus;
  featured: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
    openGraph?: {
      title?: string;
      description?: string;
      image?: string;
      url?: string;
    };
    jsonLd?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductResponse {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  category: Record<string, unknown> | string;
  collectionAssigned?: Record<string, unknown> | string;
  status: ProductStatus;
  featured: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
    openGraph?: {
      title?: string;
      description?: string;
      image?: string;
      url?: string;
    };
    jsonLd?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
