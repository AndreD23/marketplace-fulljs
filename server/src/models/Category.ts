import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  slug: String,
  created: Date,
  updated: Date,
});

const modelName = "Category";

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, userSchema);
}

export default module.exports;