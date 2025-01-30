const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const mainRoute = require("./routes/mainRoute");
const port = process.env.PORT || 3000;

require("dotenv").config();

// Enable CORS **before** defining routes
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes after CORS middleware
app.use("/", mainRoute);

// MongoDB connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connection to DB successful!"))
  .catch((err) => console.log(err));

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Hello from the MEAN API!",
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
