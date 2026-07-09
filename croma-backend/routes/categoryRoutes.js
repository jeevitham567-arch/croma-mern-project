const express = require("express");
const router = express.Router();

const {
  addCategory,
  getCategories,
} = require("../controllers/categoryController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, addCategory);

router.get("/", getCategories);

module.exports = router;