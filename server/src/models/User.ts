import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  idState: mongoose.Schema.Types.ObjectId;
  passwordHash: string;
  token: string;
  role: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  idState: { type: mongoose.Schema.Types.ObjectId },
  passwordHash: { type: String },
  token: { type: String },
  role: { type: String },
  status: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const modelName = "User";

export const User =
  mongoose.models[modelName] || mongoose.model<IUser>(modelName, UserSchema);
