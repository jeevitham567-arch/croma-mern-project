const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    let item = await Cart.findOne({
      product: productId,
    });

    if (item) {
      item.quantity += 1;
      await item.save();
    } else {
      item = await Cart.create({
        product: productId,
      });
    }

    res.json({
      success: true,
      message: "Product Added To Cart",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.find().populate("product");

    res.json({
      success: true,
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    res.json({
      success: true,
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const removeCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Item Removed",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeCart,
};