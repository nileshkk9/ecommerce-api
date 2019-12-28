const mongoose = require("mongoose");
const subcategorySchema = new mongoose.Schema({
  ownercategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  subcategoryname: {
    type: String,
    required: true
  }
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);
module.exports = Subcategory;
