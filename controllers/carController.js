const Car = require("../models/carModel");

// DESC     get all cars
// METHOD   GET /api/v1/car/all
// ACCESS   public
const getAllCars = async (req, res) => {
  try {
    const car = await Car.find().sort({ $natural: -1 });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).send("Cannot find any car");
  }
};

// DESC     get specific car
// METHOD   GET /api/v1/car/id
// ACCESS   public
const getACar = async (req, res) => {
  try {
    const car = await Car.find({ _id: req.params.id });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).send("Cannot find any car");
  }
};

// DESC     create a car
// METHOD   POST /api/v1/car/create
// ACCESS   Admin
const createCar = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.seats ||
    !req.body.price ||
    !req.body.image ||
    !req.body.gear
  ) {
    res.status(400).json({ message: "A value is missing" });
    return;
  }

  try {
    const car = await Car.create({
      title: req.body.title,
      seats: req.body.seats,
      image: req.body.image,
      price: req.body.price,
      gear: req.body.gear,
      status: req.body.status,
      rating: req.body.rating,
    });
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// DESC     delete a car
// METHOD   DELETE /api/v1/car/id
// ACCESS   admin
const deleteCar = async (req, res) => {
  try {
    const car = await Car.find({ _id: req.params.id });
    if (!car) {
      res.status(400).json({ message: "Car not found" });
      return;
    }
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).send("Cannot find that car");
  }
};

// DESC     update a car
// METHOD   PUT /api/v1/car/id
// ACCESS   admin
const updateCar = async (req, res) => {
  try {
    const car = await Car.find({ _id: req.params.id });
    if (!car) {
      res.status(400).json({ message: "Car not found" });
      return;
    }
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).send("Cannot find that car");
  }
};

module.exports = {
  createCar,
  getAllCars,
  getACar,
  updateCar,
  deleteCar,
};
