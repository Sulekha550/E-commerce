const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, default: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80" },
  category: { type: String, default: "Coffee" },
  stock: { type: Number, default: 10, min: 0 },
  rating: { type: Number, default: 4.8, min: 0, max: 5 },
  numReviews: { type: Number, default: 18 },
  roastLevel: { type: String, default: "Medium" },
  origin: { type: String, default: "Single Origin / Blend" },
  ingredients: { type: String, default: "100% Arabica Coffee Beans" },
  isBestseller: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);

