const express = require("express");
const {
  createCar,
  getAllCars,
  getACar,
  updateCar,
  deleteCar,
} = require("../controllers/carController");
const router = express.Router();

router.post("/create", createCar);
router.get("/all", getAllCars);
router.get("/:id", getACar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;
