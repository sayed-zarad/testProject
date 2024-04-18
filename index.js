const { app } = require("./app.js");
const mongoose = require('mongoose');

require('dotenv').config();
const port = process.env.PORT || 3000;
const dbURI = process.env.DATABASE;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, async () => {
      console.log(`Listening on port ${port} ...`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
