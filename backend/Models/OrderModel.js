const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderId:           { type: String, required: true, unique: true },
    userEmail:         { type: String, required: true, lowercase: true, trim: true, index: true },
    items: [
      {
        productId: { type: String, required: true },
        name:      { type: String, required: true },
        category:  { type: String, default: "" },
        brand:     { type: String, default: "Others" },
        price:     { type: Number, required: true },
        mrp:       { type: Number, default: 0 },
        image:     { type: String, default: "" },
        unit:      { type: String, default: "" },
        qty:       { type: Number, required: true, min: 1 },
        _id: false,
      },
    ],
    address: {
      label:   { type: String, default: "HOME" },
      name:    { type: String, required: true },
      line1:   { type: String, required: true },
      line2:   { type: String, default: "" },
      city:    { type: String, required: true },
      pincode: { type: String, required: true },
      phone:   { type: String, required: true },
      _id: false,
    },
    paymentMethod:     { type: String, enum: ["UPI", "CARD", "COD"], default: "COD" },
    razorpayPaymentId: { type: String, default: null },
    subtotal:          { type: Number, required: true, default: 0 },
    deliveryFee:       { type: Number, default: 0 },
    total:             { type: Number, required: true },
    status: {
      type:    String,
      enum:    ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Confirmed",
      index:   true,
    },
    placedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
