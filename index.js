const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
dotenv.config();
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successfully established");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
