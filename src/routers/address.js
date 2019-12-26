const express = require("express");
const Address = require("../model/address");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/api/insertAddress", auth, async (req, res) => {
  const address = new Address({ ...req.body, owner: req.user._id });
  try {
    await address.save();
    res.status(201).send({ address });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/api/getAddress", auth, async (req, res) => {
  const _id = req.user._id;
  console.log(_id);
  try {
    const address = await Address.find({ owner: _id });
    res.send(address);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/api/deleteAddress", async (req, res) => {
  try {
    const address = await Address.findOneAndDelete(req.body._id);
    res.send(address);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
