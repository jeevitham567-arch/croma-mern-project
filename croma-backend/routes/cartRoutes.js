const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCart,
  removeCart,
} = require("../controllers/cartController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/", addToCart);
router.get("/", getCart);
router.put("/:id", updateCart);
router.delete("/:id", removeCart);

module.exports = router;