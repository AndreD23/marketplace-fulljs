import mongoose, { Schema, Document } from "mongoose";

export interface AdImage {
  url: string;
  default: boolean;
}

export interface IAd extends Document {
  idUser: string;
  state: string;
  idCategory: string;
  images: [AdImage];
  title: string;
  description: string;
  price: number;
  priceNegotiable: boolean;
  views: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdSchema: Schema<IAd> = new mongoose.Schema({
  idUser: { type: String },
  state: { type: String },
  idCategory: { type: String },
  images: [{ type: Object }],
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  priceNegotiable: { type: Boolean },
  views: { type: Number },
  status: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const modelName = "Ad";

export const Ad =
  mongoose.models[modelName] || mongoose.model<IAd>(modelName, AdSchema);
