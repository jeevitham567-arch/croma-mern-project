const Wishlist = require("../models/Wishlist");

// ADD TO WISHLIST
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const exists = await Wishlist.findOne({
      user: req.user.id,
      product: productId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user.id,
      product: productId,
    });

    res.status(201).json({
      success: true,
      message: "Added to Wishlist",
      wishlist,
    });
  } catch (error) {
    console.log("Add Wishlist Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET MY WISHLIST
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    })
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.log("Get Wishlist Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// REMOVE FROM WISHLIST
const removeWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Removed from Wishlist",
    });
  } catch (error) {
    console.log("Remove Wishlist Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlist,
};