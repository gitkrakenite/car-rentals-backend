const express = require("express");
const {
  createOrder,
  allOrders,
  getAnOrder,
  updateOrderStatus,
  getMyOrders,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// "base_url /api/v1/order"
router.post("/create", protect, createOrder); //create an order
router.get("/admin", allOrders); //get all orders
router.get("/:id", getAnOrder); //get specific order
router.get("/", protect, getMyOrders); //get all orders; //customer can see all his or her orders
router.put("/:id", updateOrderStatus); //update status of an order

module.exports = router;
