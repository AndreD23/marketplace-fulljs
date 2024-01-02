import mongoose, { Schema, Document } from "mongoose";

interface IState extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const StateSchema: Schema<IState> = new mongoose.Schema({
  name: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const modelName = "State";

export const State =
  mongoose.models[modelName] || mongoose.model<IState>(modelName, StateSchema);
