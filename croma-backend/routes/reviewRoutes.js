const express = require("express");

const router = express.Router();

const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, addReview);

router.get("/:productId", getReviews);

router.delete("/:id", verifyToken, deleteReview);

module.exports = router;