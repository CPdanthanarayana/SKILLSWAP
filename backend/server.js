const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for frontend communication
app.use(
  cors({
    origin: "http://localhost:3000", // React app URL
    credentials: true,
  })
);

// Middleware to read JSON
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
