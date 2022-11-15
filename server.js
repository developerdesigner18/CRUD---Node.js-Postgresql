const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv').config();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome To Our Community" });
});

require('./Routes/route')(app);

// set port, listen for requests
const PORT = process.env.PORT || 7070;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});