const { Router } = require("express");
const orderRouter = Router();
const orderController = require("../controllers/order");

// Route to create a new order
orderRouter.post("/", orderController.createOrder);

// Route to update an existing order
orderRouter.put("/:orderId", orderController.updateOrder);
orderRouter.delete("/:orderId", orderController.deleteOrder);

// Route to get all orders
orderRouter.get("/", orderController.getAllOrders);

module.exports = {
  orderRouter,
};
