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
    Product.find(req.body)
      .populate("subcategory")
      .exec(function(err, results) {
        if (err) res.status(500).send(err);
        res.send(results);
      });
    // res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/api/searchProducts/:search", async (req, res) => {
  // console.log(req.params.search);
  try {
    /*FULL TEXT SEARCH USING $text*/
    // Product.find({ $text: { $search: req.params.search } }).exec(function(
    //   err,
    //   docs
    // ) {
    //   if (err) res.send(err);
    //   res.send(docs);
    // });

    /* PARTIAL TEXT SEARCH USING regex*/

    Product.find(
      {
        productname: {
          $regex: new RegExp(req.params.search)
        }
      },
      function(err, doc) {
        if (err) res.send(err);
        res.send(doc);
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
