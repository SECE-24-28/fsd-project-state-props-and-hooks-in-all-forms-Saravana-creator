const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname:  { type: String, trim: true, default: "" },
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone:     { type: String, default: "" },
    password:  { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    addresses: [
      {
        label:     { type: String, default: "HOME" },
        name:      String,
        line1:     String,
        line2:     { type: String, default: "" },
        city:      String,
        pincode:   String,
        phone:     String,
        isDefault: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
