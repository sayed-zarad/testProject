const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  medications: [
    {
      medication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["delivered", "picked up from pharmacy"],
    default: "delivered",
  },
  orderDate: { type: Date, default: Date.now },
  totalCost: { type: Number },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
