const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCart,
  removeCart,
} = require("../controllers/cartController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, addToCart);

router.get("/", verifyToken, getCart);

router.put("/:id", verifyToken, updateCart);

router.delete("/:id", verifyToken, removeCart);

module.exports = router;