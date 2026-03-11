import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import Product from "./models/product.js";
import products from "./data/products.js";

const importData = async () => {
  try {
    await connectDB();

    const existingProducts = await Product.countDocuments();

    if (existingProducts === 0) {
      await Product.insertMany(products);
      console.log("Products inserted successfully!");
    } else {
      console.log("Products already exist in database. Seeder skipped.");
    }

    process.exit();

  } catch (error) {
    console.error("Seeder error:", error);
    process.exit(1);
  }
};

importData();