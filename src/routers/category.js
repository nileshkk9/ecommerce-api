const express = require("express");
const Category = require("../model/category");
const router = new express.Router();

router.post("/api/insertCategory", async (req, res) => {
  try {
    const category = new Category(req.body);
    const data = await category.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
