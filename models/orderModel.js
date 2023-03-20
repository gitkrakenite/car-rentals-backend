const mongoose = require("mongoose");
// const Car = require("./carModel");
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    email: { type: String, required: true },
    name: { type: String, required: true },
    pickUp: { type: String, required: true },
    pickUpDateAndTime: { type: String, required: true },
    dropOff: { type: String, required: true },
    dropOffDateAndTime: { type: String, required: true },
    car: { type: [], required: true },
    status: {
      type: String,
      default: "received",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
