import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  slug: string;
  created: Date;
  updated: Date;
}

const CategorySchema: Schema<ICategory> = new mongoose.Schema({
  name: { type: String },
  slug: { type: String },
  created: { type: Date },
  updated: { type: Date },
});

const modelName = "Category";

export const Category =
  mongoose.models[modelName] ||
  mongoose.model<ICategory>(modelName, CategorySchema);
