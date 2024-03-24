const express = require("express");
const app = express();
app.use(express.json());

const { medicineRouter } = require('./routes/medicine');

app.use('/api/medicine', medicineRouter);

module.exports = {
    app,
};