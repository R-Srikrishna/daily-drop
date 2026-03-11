import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Product from "./models/product.js";
import products from "./data/products.js";

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Products inserted successfully!");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();