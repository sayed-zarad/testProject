const mongoose = require("mongoose");
const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  manufacturer: { type: String, required: true },
  price: { type: Number, required: true },
});
const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
