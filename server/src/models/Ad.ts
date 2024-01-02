import mongoose, { Schema, Document } from "mongoose";

export interface AdImage {
  url: string;
  default: boolean;
}

export interface IAd extends Document {
  idUser: mongoose.Schema.Types.ObjectId,
  idState: mongoose.Schema.Types.ObjectId,
  idCategory: mongoose.Schema.Types.ObjectId,
  images: [AdImage];
  title: string;
  description: string;
  price: number;
  priceNegotiable: boolean;
  views: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AdSchema: Schema<IAd> = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId },
  idState: { type: mongoose.Schema.Types.ObjectId },
  idCategory: { type: mongoose.Schema.Types.ObjectId },
  images: [{ type: Object }],
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  priceNegotiable: { type: Boolean },
  views: { type: Number },
  status: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const modelName = "Ad";

export const Ad =
  mongoose.models[modelName] || mongoose.model<IAd>(modelName, AdSchema);
