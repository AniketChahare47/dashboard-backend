require("dotenv").config();

const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();

// ✅ Dynamic Port for Render
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());

// ✅ CORS Setup
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://dashboard-frontend-95wx.vercel.app",
    ],
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});