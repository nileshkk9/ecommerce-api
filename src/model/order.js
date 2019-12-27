const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Address"
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Products"
      },
      qty: {
        type: Number,
        required: true
      }
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
