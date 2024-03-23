const express = require("express");
const bodyParser = require("body-parser");

const {validateMedicine} = require("../helper/validation");
const {medicines} = require("../models/medicine");
const app = express();

// Middleware
app.use(bodyParser.json());



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

const updateMedicine = (req, res) => {
  const id = req.params.id;
    const { name, dosage, manufacturer } = req.body;
    const medicineIndex = medicines.findIndex(medicine => medicine.id === id);
    if (medicineIndex === -1) {
        return res.status(404).json({ message: "Medicine not found" });
    }
    const { error } = validateMedicine(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    medicines[medicineIndex] = {
        ...medicines[medicineIndex],
        name: name || medicines[medicineIndex].name,
        dosage: dosage || medicines[medicineIndex].dosage,
        manufacturer: manufacturer || medicines[medicineIndex].manufacturer,
    };

    res.json({ message: "Medicine updated successfully", medicine: medicines});
};

const getMedicineById = (req, res) => {
  const id = req.params.id;
  const medicine = medicines.find(medicine => medicine.id === id);
  if (!medicine) {
    return res.status(404).json({ message: "Medicine not found" });
  }
  res.json(medicine);
};

module.exports = {
  addMedicine,
  updateMedicine,
};
