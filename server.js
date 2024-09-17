const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
const server = http.createServer(app);
require("dotenv").config();
app.use(cors());
const port = process.env.PORT || 3000;

console.log(port, "PORT");

// MongoDB Connection (adjust your MongoDB URL)
// mongoose.connect('mongodb://127.0.0.1:27017/meanDb', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connection to DB successful!"))
  .catch((err) => console.log(err));

// Basic route
app.get("/api/data", (req, res) => {
  res.json({
    message: "Hello from the MEAN API!",
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
