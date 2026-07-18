const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./products.json");

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(" Products imported successfully!");
    process.exit();
  } catch (error) {
    console.error(" Error importing products:", error);
    process.exit(1);
  }
};

seedProducts();