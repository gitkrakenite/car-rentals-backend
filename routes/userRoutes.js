const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getAUser,
  deleteAUser,
} = require("../controllers/userController");
const router = express.Router();

// @base_url /api/v1/user
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers); //all users
router.get("/:id", getAUser); //a user
router.delete("/:id", deleteAUser); //remove a user

module.exports = router;
