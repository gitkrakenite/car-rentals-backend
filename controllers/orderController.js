const Order = require("../models/orderModel");
const Car = require("../models/carModel");

// DESC     get only my orders
// METHOD   GET /api/v1/order/customer
// ACCESS   private
const getMyOrders = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user.id });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

// DESC     create an order
// METHOD   POST /api/v1/order/create
// ACCESS   private
const createOrder = async (req, res) => {
  if (!req.body.email) res.send("Email missiong");
  if (!req.body.name) res.send("name missing");
  if (!req.body.pickUp) res.send("pickup missing");

  // if (
  //   !req.body.email ||
  //   !req.body.name ||
  //   !req.body.pickup ||
  //   !req.body.dropOff
  // ) {
  //   res.status(400).json({ message: "details missing" });
  //   return;
  // }

  try {
    const order = await Order.create({
      email: req.body.email,
      name: req.body.name,
      pickUp: req.body.pickUp,
      pickUpDateAndTime: req.body.pickUpDateAndTime,
      dropOff: req.body.dropOff,
      dropOffDateAndTime: req.body.dropOffDateAndTime,
      car: req.body.car,
      user: req.user.id,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// DESC     get all orders
// METHOD   GET /api/v1/order
// ACCESS   admin
const allOrders = async (req, res) => {
  try {
    const order = await Order.find().sort({ $natural: -1 });
    if (!order) {
      res.status(400).json({ message: "orders not found" });
      return;
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).send("Could not fetch orders");
  }
};

// DESC     get an order
// METHOD   GET /api/v1/order/id
// ACCESS   admin
const getAnOrder = async (req, res) => {
  if (!req.params.id) {
    res.send("ID needed");
    return;
  }
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(400).json({ message: "order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// DESC     update the status of an order
// METHOD   PUT /api/v1/order/id
// ACCESS   admin
const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  // console.log(req.body);

  if (!order) {
    res.status(400).json({ message: "order not found" });
    return;
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: "Could not update order" });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAnOrder,
  allOrders,
  updateOrderStatus,
};
