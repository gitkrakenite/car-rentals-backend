const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    seats: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    gear: { type: String, required: true },
    status: { type: String, required: true, default: "available" },
    rating: { type: String, default: "good" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
