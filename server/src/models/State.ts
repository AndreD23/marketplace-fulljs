import mongoose, { Schema, Document } from "mongoose";

interface IState extends Document {
  name: string;
  created: Date;
  updated: Date;
}

const StateSchema: Schema<IState> = new mongoose.Schema({
  name: { type: String },
  created: { type: Date },
  updated: { type: Date },
});

const modelName = "State";

export const State =
  mongoose.models[modelName] || mongoose.model<IState>(modelName, StateSchema);
