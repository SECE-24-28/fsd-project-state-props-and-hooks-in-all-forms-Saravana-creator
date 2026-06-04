const express = require("express");
const router  = express.Router();
const {
  PlaceOrder,
  GetUserOrders,
  GetOrderById,
  UpdateOrderStatus,
} = require("../Controllers/OrderController");
const { verifyToken, verifyAdmin } = require("../Utils/authMiddleware");

// Place a new order (user must be logged in)
router.post("/", verifyToken, PlaceOrder);

// Get all orders for a specific user
router.get("/user/:email", verifyToken, GetUserOrders);

// Get a single order by orderId string (e.g. EZ-10001)
router.get("/:orderId", verifyToken, GetOrderById);

// Admin: update order status
router.put("/:orderId/status", verifyToken, verifyAdmin, UpdateOrderStatus);

module.exports = router;
