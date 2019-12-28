const express = require("express");
const Subcategory = require("../model/subcategory");
const router = new express.Router();

router.post("/api/insertSubcategory", async (req, res) => {
  try {
    const subcategory = new Subcategory(req.body);
    const data = await subcategory.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
