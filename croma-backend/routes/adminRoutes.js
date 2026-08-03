const express = require("express");

const router = express.Router();

const {
  getAdminStats,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/stats",
  authMiddleware,
  getAdminStats
);

module.exports = router;