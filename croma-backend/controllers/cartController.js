const Cart = require("../models/cart");

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const cart = await Cart.create({
      user: req.user.id,
      product: req.body.product,
      quantity: req.body.quantity,
    });

    res.status(201).json({
      success: true,
      message: "Product Added To Cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id })
      .populate("product");

    res.status(200).json({
      success: true,
      count: cart.length,
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Quantity
const updateCart = async (req, res) => {
  try {

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        quantity: req.body.quantity,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cart Updated",
      cart,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Remove Cart Item
const removeCart = async (req, res) => {

  try {

    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product Removed From Cart",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeCart,
};