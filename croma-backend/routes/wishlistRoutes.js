const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlistController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, addToWishlist);

router.get("/", verifyToken, getWishlist);

router.delete("/:id", verifyToken, removeWishlist);

module.exports = router;