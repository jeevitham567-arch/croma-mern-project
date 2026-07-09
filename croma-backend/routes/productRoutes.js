const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
} = require("../controllers/productController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, addProduct);

router.get("/", getProducts);

module.exports = router;