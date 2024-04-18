const { Router } = require("express");
const orderRouter = Router();
const orderController = require("../controllers/order");

orderRouter.post("/", orderController.createOrder);

module.exports = {
  orderRouter,
};
