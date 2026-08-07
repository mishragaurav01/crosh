import type { Types, Document } from 'mongoose';

export interface Collection {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isFeatured: boolean;
  isActive: boolean;
  seo?: { title?: string; description?: string; keywords?: string[] };
}

export interface CollectionDocument extends Collection, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionResponse extends Collection {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
