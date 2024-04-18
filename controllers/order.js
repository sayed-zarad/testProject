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

module.exports = {
  createOrder,
};
