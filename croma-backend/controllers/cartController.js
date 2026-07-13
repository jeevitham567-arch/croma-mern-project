const Cart = require("../models/cart");
const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

  
    const existingCart = await Cart.findOne({
      user: req.user.id,
      product,
    });

    if (existingCart) {
      existingCart.quantity += quantity;

      await existingCart.save();

      return res.status(200).json({
        success: true,
        message: "Cart Updated",
        cart: existingCart,
      });
    }

    // Create new cart item
    const cart = await Cart.create({
      user: req.user.id,
      product,
      quantity,
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

const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

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

const updateCart = async (req, res) => {
  try {

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        quantity: req.body.quantity,
      },
      {
        new: true,
      }
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