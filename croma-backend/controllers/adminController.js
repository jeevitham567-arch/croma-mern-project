const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// GET ADMIN DASHBOARD STATS
const getAdminStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalUsers = await User.countDocuments();

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue,
      },
    });
  } catch (error) {
    console.log("Admin Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get admin statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getAdminStats,
};