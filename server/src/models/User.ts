import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  state: String,
  passwordHash: String,
  token: String,
  created: Date,
  updated: Date,
});

const modelName = "User";

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, userSchema);
}

export default module.exports;
