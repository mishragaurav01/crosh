import { Types, Document } from 'mongoose';

export interface Image {
  _id?: Types.ObjectId;
  productId: Types.ObjectId | string;
  url: string;
  altText?: string;
  isThumbnail: boolean;
  sortOrder: number;
  status: 'Active' | 'Archived';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ImageDocument extends Image, Document {
  _id: Types.ObjectId;
}

export type ImageResponse = Omit<Image, '_id' | 'productId'> & {
  id: string;
  productId: string;
};
