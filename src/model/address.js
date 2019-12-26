const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users"
    },
    name: {
      type: String,
      required: true
    },
    address1: {
      type: String,
      required: true
    },
    address2: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    pincode: {
      type: Number,
      required: true
    },
    phoneno: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);
const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
