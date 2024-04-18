const express = require("express");
const bodyParser = require("body-parser");

const {validateMedicine} = require("../helper/validation");
const {medicines} = require("../models/medicine");
const Medicine  =require("../models/medicine");
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


const updateMedicine = async (req, res) => {
  const id = req.params.id;
  const { name, dosage, manufacturer } = req.body;

  try {
    const medicine = await Medicine.findByIdAndUpdate(id, {
      name,
      dosage,
      manufacturer,
    }, { new: true });

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.json({ message: "Medicine updated successfully", medicine });
  } catch (error) {
    console.error('Error updating medicine:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};




const deleteMedicine = (req, res) => {
  const id = req.params.id;
  const medicineIndex = medicines.findIndex(medicine => medicine.id === id);
  if (medicineIndex === -1) {
    return res.status(404).json({ message: "Medicine not found" });
  }

  // Remove the medicine from the array
  medicines.splice(medicineIndex, 1);

  res.json({ message: "Medicine deleted successfully" });
};

const getMedicineById = (req, res) => {
  const id = req.params.id;
  const medicine = medicines.find(medicine => medicine.id === id);
  if (!medicine) {
    return res.status(404).json({ message: "Medicine not found" });
  }
  res.json(medicine);
};
const getAllMedicines = (req, res) => {
  res.json({ medicines: medicines });
};

module.exports = {
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicineById,
  getAllMedicines,
};
