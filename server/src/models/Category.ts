import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema<ICategory> = new mongoose.Schema({
  name: { type: String },
  slug: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const modelName = "Category";

export const Category =
  mongoose.models[modelName] ||
  mongoose.model<ICategory>(modelName, CategorySchema);
