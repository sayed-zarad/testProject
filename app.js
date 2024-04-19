const express = require("express");
const app = express();
app.use(express.json());

const { medicineRouter } = require("./routes/medicine");
const { customerRouter } = require("./routes/customers");
const { orderRouter } = require("./routes/order");

app.use("/api/medicine", medicineRouter);
app.use("/api/customers", customerRouter);
app.use("/api/order", orderRouter);
module.exports = {
  app,
};
