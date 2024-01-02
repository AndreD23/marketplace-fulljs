import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  idState: string;
  passwordHash: string;
  token: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  idState: { type: String },
  passwordHash: { type: String },
  token: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const modelName = "User";

export const User =
  mongoose.models[modelName] || mongoose.model<IUser>(modelName, UserSchema);
