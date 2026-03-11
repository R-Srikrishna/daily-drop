import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  original: Number,
  image: String,
  description: String,
  category: String,
  rating: Number,
  reviews: Number,
  stock: Number,
  maxStock: Number,
  hot: Boolean
});

export default mongoose.model("Product", productSchema);