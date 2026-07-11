const express = require("express");

const router = express.Router();

const {
  makePayment,
  getPayments,
} = require("../controllers/paymentController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, makePayment);

router.get("/", verifyToken, getPayments);

module.exports = router;