const connectToMongo = require('./db'); // Import MongoDB connection
const express = require('express');
const cors = require('cors');

connectToMongo(); // Connect to MongoDB

const app = express();
const port = 5000; // Backend port

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); // Allow React frontend

// Routes
app.use('/api/auth', require('./routes/auth'));   // Auth routes
app.use('/api/notes', require('./routes/notes')); // Notes routes

// Start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
