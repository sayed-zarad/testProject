const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
const medicineRouter = require("./routes/medicine");
app.use(bodyParser.json());

app.use("/", medicineRouter); // Mount the medicine router at /medicine

module.exports = app;
