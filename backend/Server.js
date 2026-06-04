const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
}));

// ── Routes ──────────────────────────────────────────────────────────────────
const userRoutes    = require("./Routers/UserRoutes");
const productRoutes = require("./Routers/ProductRoutes");
const orderRoutes   = require("./Routers/OrderRoutes");

app.use("/api/users",    userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders",   orderRoutes);

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.json({ message: "Annachi Kadai API is running 🛒" }));

// ── Connect MongoDB → then start server ─────────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected to:", process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });