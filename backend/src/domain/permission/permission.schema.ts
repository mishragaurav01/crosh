import { Schema, model } from 'mongoose';

export const permissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const PermissionModel = model('Permission', permissionSchema);
