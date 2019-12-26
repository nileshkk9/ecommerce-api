const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");
const User = require("../model/user");
const { sendmail } = require("../email/account");
const router = new express.Router();
const mongoose = require("mongoose");
const Product = require("../model/product");

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(600).send(e);
  }

  // res.send(user);
  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch(error => {
  //     res.status(400).send(error);
  //   });
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["name", "age", "email", "password"];
  const isValidOperation = updates.every(update =>
    allowedUpdate.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById({ _id });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }

  // User.findById({ _id })
  //   .then(user => {
  //     if (!user) {
  //       return res.status(404).send();
  //     }
  //     res.send(user);
  //   })
  //   .catch(e => {
  //     res.status(500).send();
  //   });
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.params.id);
    // if (!user) {
    //   return res.status(404).send();
    // }
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredential(req.body.email, req.body.password);
    // console.log(user);
    const token = await user.generateAuthToken();

    // console.log(token);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});
const upload = multer({
  limits: {
    fileSize: 1000000
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(png|jpeg|jpg|)$/)) {
      return cb(new Error("Please upload a image file png jpg or jpeg"));
    }
    cb(undefined, true);
  }
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
});

/* CART */
router.patch("/api/insertInCart", auth, async (req, res) => {
  // pid and qty
  const item = req.body;

  try {
    req.user.cart = req.user.cart.concat(item);
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/api/getCart", auth, async (req, res) => {
  try {
    // console.log(req.user);
    const user = await User.findById(req.user._id);
    await user.populate("cart._id").execPopulate();
    res.send(user.cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/api/deleteFromCart", auth, async (req, res) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.body._id);

    req.user.cart = req.user.cart.filter(item => {
      return !item._id.equals(_id);
    });
    await req.user.save();
    res.send(req.user.cart);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
