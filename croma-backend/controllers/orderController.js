const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      city,
      state,
      pincode,
    } = req.body;

    const cart = await Cart.find().populate("product");

    if (cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const items = cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const totalAmount = cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      address: {
        name,
        phone,
        address,
        city,
        state,
        pincode,
      },
    });


    await Cart.deleteMany();

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  placeOrder,
  getOrders,
};