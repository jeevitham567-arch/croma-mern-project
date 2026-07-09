const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getOrders,
  updateOrder,
} = require("../controllers/orderController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, placeOrder);

router.get("/", verifyToken, getOrders);

router.put("/:id", verifyToken, updateOrder);

module.exports = router;