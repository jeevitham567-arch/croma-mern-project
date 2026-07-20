const express = require("express");

const router = express.Router();

const {
  makePayment,
  getPayments,
  getPaymentById,
} = require("../controllers/paymentController");

const verifyToken = require("../middleware/authMiddleware");


router.post("/", verifyToken, makePayment);

router.get("/", verifyToken, getPayments);

router.get("/:id", verifyToken, getPaymentById);

module.exports = router;