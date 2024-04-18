const express = require("express");
const app = express();
app.use(express.json());

const { medicineRouter } = require('./routes/medicine');
const {customerRouter} = require('./routes/customers');

app.use('/api/medicine', medicineRouter);
app.use('/api/customers',customerRouter);
module.exports = {
    app,
};