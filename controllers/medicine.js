const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json());

let medicines = [
  {
    id: "1",
    name: "Paracetamol",
    dosage: "500mg",
    manufacturer: "Example Pharmaceuticals",
  },
];

function addMedicine(req, res) {
  const { name, dosage, manufacturer } = req.body;

  // Check if all required fields are present
  if (!name || !dosage || !manufacturer) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Create new medicine object
  const newMedicine = {
    id: medicines.length + 1, // simple id generation
    name,
    dosage,
    manufacturer,
  };

  // Add the new medicine to the array
  medicines.push(newMedicine);

  // Respond with the newly added medicine
  res.status(201).json(newMedicine);
}

module.exports = {
  addMedicine,
  medicines,
};
