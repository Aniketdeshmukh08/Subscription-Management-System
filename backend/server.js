const express = require("express");
const cors = require("cors");

const app = express();   // ✅ app created first

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const subscriptionRoutes = require("./routes/subscriptions");

// Use routes
app.use("/subscriptions", subscriptionRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Subscription API Running");
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server running on port 5000");
});