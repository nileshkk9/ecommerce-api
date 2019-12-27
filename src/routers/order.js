const express = require("express");
const auth = require("../middleware/auth");
const Order = require("../model/order");
const router = new express.Router();

router.post("/api/order", auth, async (req, res) => {
  try {
    const order = new Order({ ...req.body, owner: req.user._id });
    const data = await order.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/api/getOrder", auth, async (req, res) => {
  const _id = req.user._id;
  try {
    // const orders = await Order.find({ owner: _id });
    // const orders = await Order.find()
    //   .populate("address")
    //   .populate("product")
    //   .execPopulate();
    Order.find({ owner: _id })
      .populate("address")
      .populate("products.product")
      .exec(function(err, results) {
        if (err) res.status(500).send(err);
        res.send(results);
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
