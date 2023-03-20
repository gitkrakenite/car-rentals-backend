const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    profile: {
      type: String,
      default:
        "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
    },
    password: { type: String, required: true },
    isAdmin: { type: String, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);