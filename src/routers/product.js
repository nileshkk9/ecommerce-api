const express = require("express");
const Product = require("../model/product");
const router = new express.Router();

router.post("/api/insertProducts", async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).send({ product });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/api/getProductsByAttr", async (req, res) => {
  try {
    const product = await Product.find(req.body);
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
