import mongoose, { Schema, Document } from "mongoose";

interface IAd extends Document {
  idUser: string;
  state: string;
  category: string;
  images: [Object];
  title: string;
  description: string;
  price: number;
  priceNegotiable: boolean;
  views: number;
  status: string;
  created: Date;
  updated: Date;
}

const AdSchema: Schema<IAd> = new mongoose.Schema({
  idUser: { type: String },
  state: { type: String },
  category: { type: String },
  images: [{ type: Object }],
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  priceNegotiable: { type: Boolean },
  views: { type: Number },
  status: { type: String },
  created: { type: Date },
  updated: { type: Date },
});

const modelName = "Ad";

export const Ad =
  mongoose.models[modelName] || mongoose.model<IAd>(modelName, AdSchema);
