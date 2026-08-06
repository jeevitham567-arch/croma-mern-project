const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  createRazorpayOrder,
  verifyPayment,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

// ===============================
// RAZORPAY PAYMENT
// ===============================

router.post(
  "/create-razorpay-order",
  authMiddleware,
  createRazorpayOrder
);

router.post(
  "/verify-payment",
  authMiddleware,
  verifyPayment
);

// ===============================
// CREATE FINAL ORDER
// ===============================

router.post(
  "/",
  authMiddleware,
  createOrder
);

// ===============================
// USER ORDERS
// ===============================

router.get(
  "/my-orders",
  authMiddleware,
  getMyOrders
);

// ===============================
// ADMIN ALL ORDERS
// ===============================

router.get(
  "/admin/all",
  authMiddleware,
  getAllOrders
);

// ===============================
// ADMIN UPDATE STATUS
// ===============================

router.put(
  "/admin/:id/status",
  authMiddleware,
  updateOrderStatus
);

module.exports = router;