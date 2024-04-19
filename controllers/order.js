const express = require("express");
const bodyParser = require("body-parser");
const Order = require("../models/orders");
const Medicine = require("../models/medicine");
const app = express();

app.use(bodyParser.json());

const createOrder = async (req, res) => {
  try {
    // Extract data from request body
    const { customer, medications, status } = req.body;

    // Calculate total cost based on medication prices
    let totalCost = 0;
    for (const { medication, quantity } of medications) {
      // Find the medication in the database
      const med = await Medicine.findById(medication);
      if (!med) {
        return res
          .status(404)
          .json({ error: `Medication with ID ${medication} not found` });
      }
      // Add the price of the medication multiplied by quantity to the total cost
      totalCost += med.price * quantity;
    }

    // Create a new order instance
    const newOrder = new Order({
      customer,
      medications,
      status,
      totalCost,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Respond with the saved order
    res.status(201).json(savedOrder);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { customer, medications, status } = req.body;

    // Calculate total cost based on medication prices
    let totalCost = 0;
    for (const { medication, quantity } of medications) {
      const med = await Medicine.findById(medication);
      if (!med) {
        return res
          .status(404)
          .json({ error: `Medication with ID ${medication} not found` });
      }
      totalCost += med.price * quantity;
    }

    // Find the existing order by ID
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the order with new data
    existingOrder.customer = customer;
    existingOrder.medications = medications;
    existingOrder.status = status;
    existingOrder.totalCost = totalCost;

    // Save the updated order to the database
    const updatedOrder = await existingOrder.save();

    // Respond with the updated order
    res.status(200).json(updatedOrder);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // Retrieve all orders from the database
    const orders = await Order.find();

    // Respond with the list of orders
    res.status(200).json(orders);
  } catch (error) {
    // If an error occurs, respond with an error message
    res.status(500).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    // Find the order by ID and delete it
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  getAllOrders,
  deleteOrder,
};
