const express = require("express");
require("./db/mongoose"); //connection created (will run the content of mongoose.js)
const userRouter = require("./routers/user");
const productRouter = require("./routers/product");
const addressRouter = require("./routers/address");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); //to parse data coming in to json by default
app.use(userRouter);
app.use(productRouter);
app.use(addressRouter);
app.listen(port, () => {
  console.log("server running on port: " + port);
});

// const Address = require("./model/address");
// const main = async () => {
//   const address = await Address.findById("5e04e2e7e0884c0814e64a0a");
//   await address.populate("owner").execPopulate();
//   console.log(address);
// };
// main();
