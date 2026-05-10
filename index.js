require("dotenv").config();

const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();

const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://dashboard-frontend-bay-mu.vercel.app/"
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});