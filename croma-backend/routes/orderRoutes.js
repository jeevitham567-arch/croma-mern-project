const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getOrders,
  createOrder,
  verifyPayment,
} = require("../controllers/orderController");

const verifyToken = require("../middleware/authMiddleware");
router.get("/", verifyToken, getOrders);

router.post(
  "/create-razorpay-order",
  verifyToken,
  createOrder
);

router.post(
  "/verify-payment",
  verifyToken,
  verifyPayment
);

router.post("/", verifyToken, placeOrder);

module.exports = router;