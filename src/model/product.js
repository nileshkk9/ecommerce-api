const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true
    },
    subcategory: {
      type: String,
      required: true
    },
    pid: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },

    price: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    details: {
      length: Number,
      breadth: Number,
      modelno: String,
      author: String,
      title: String
    }
  },

  {
    timestamps: true
  }
);
const Product = mongoose.model("Products", productSchema);
module.exports = Product;
