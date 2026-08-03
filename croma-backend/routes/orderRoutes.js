const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createOrder);

router.get("/my-orders", authMiddleware, getMyOrders);

router.get("/admin/all", authMiddleware, getAllOrders);

router.put(
  "/admin/:id/status",
  authMiddleware,
  updateOrderStatus
);

module.exports = router;