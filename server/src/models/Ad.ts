import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  idUser: String,
  state: String,
  category: String,
  images: [Object],
  title: String,
  description: String,
  price: Number,
  priceNegotiable: Boolean,
  views: Number,
  status: String,
  created: Date,
  updated: Date,
});

const modelName = "Ad";

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName];
} else {
  module.exports = mongoose.model(modelName, userSchema);
}

export default module.exports;
