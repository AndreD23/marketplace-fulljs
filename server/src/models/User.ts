import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  state: string;
  passwordHash: string;
  token: string;
  role: string;
  status: string;
  created: Date;
  updated: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  state: { type: String },
  passwordHash: { type: String },
  token: { type: String },
  created: { type: Date },
  updated: { type: Date },
});

const modelName = "User";

export const User =
  mongoose.models[modelName] || mongoose.model<IUser>(modelName, UserSchema);
