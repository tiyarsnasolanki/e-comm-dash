// db/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  company: String,
  image: String, // ✅ Add this line to store image path
});

module.exports = mongoose.model("products", ProductSchema);
