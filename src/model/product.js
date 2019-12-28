const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subcategory"
    },
    productname: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },
    // rating: {
    //   type: Number
    // },
    // boughtby: {
    //   type: Number
    // },
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
    },
    tags: {
      type: String
    }
  },

  {
    timestamps: true
  }
);

productSchema.index({ productname: "text", description: "text" });
const Product = mongoose.model("Products", productSchema);
module.exports = Product;
