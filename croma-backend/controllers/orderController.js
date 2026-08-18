const Order = require("../models/Order");
const crypto = require("crypto");
const razorpay = require("../config/razorpay");

// ===============================
// CREATE RAZORPAY ORDER
// ===============================
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount",
      });
    }

    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order: razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Razorpay Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

// ===============================
// VERIFY RAZORPAY PAYMENT
// ===============================
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details are missing",
      });
    }

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);

    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

// ===============================
// CREATE FINAL ORDER
// ===============================
const createOrder = async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      address,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in order",
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      address: JSON.stringify(address),
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// ===============================
// GET MY ORDERS
// ===============================
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: error.message,
    });
  }
};

// ===============================
// GET ALL ORDERS - ADMIN
// ===============================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get All Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get all orders",
      error: error.message,
    });
  }
};

// ===============================
// UPDATE ORDER STATUS - ADMIN
// ===============================
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
        runValidators: false,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

// ===============================
// EXPORT ALL FUNCTIONS
// ===============================
module.exports = {
  createRazorpayOrder,
  verifyPayment,
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};