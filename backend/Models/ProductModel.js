const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    brand:    { type: String, default: "Others", trim: true },
    price:    { type: Number, required: true, min: 0 },
    mrp:      { type: Number, default: 0, min: 0 },
    unit:     { type: String, default: "" },
    badge:    { type: String, default: "" },
    image:    { type: String, default: "" },
    addedBy:  { type: String, default: "admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
