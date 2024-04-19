const express = require("express");
const bodyParser = require("body-parser");

const { validateMedicine } = require("../helper/validation");
const { medicines } = require("../models/medicine");
const Medicine = require("../models/medicine");
const app = express();

// Middleware
app.use(bodyParser.json());

async function addMedicine(req, res) {
  const { name, dosage, manufacturer, price } = req.body;

  // Check if all required fields are present
  if (!name || !dosage || !manufacturer) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    // Create new medicine object
    const newMedicine = new Medicine({
      name,
      dosage,
      manufacturer,
      price,
    });
    const savedMedicine = await newMedicine.save();

    res.status(201).json(savedMedicine);
  } catch (error) {
    // Handle error if saving to the database fails
    console.error("Error adding medicine:", error);
    res.status(500).json({ message: "Failed to add medicine", error });
  }
}

const updateMedicine = async (req, res) => {
  const id = req.params.id;
  const { name, dosage, manufacturer, price } = req.body;

  try {
    const medicine = await Medicine.findByIdAndUpdate(
      id,
      {
        name,
        dosage,
        manufacturer,
        price,
      },
      { new: true }
    );

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.json({ message: "Medicine updated successfully", medicine });
  } catch (error) {
    console.error("Error updating medicine:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteMedicine = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(id);

    if (!deletedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.json({ message: "Medicine deleted successfully" });
  } catch (error) {
    console.error("Error deleting medicine:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getMedicineById = (req, res) => {
  const id = req.params.id;
  const medicine = medicines.find((medicine) => medicine.id === id);
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
