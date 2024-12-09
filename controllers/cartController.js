const Cart = require("../models/cartModel");

const getUserCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve cart", error });
  }
};

const saveCart = async (req, res) => {
  const { userId, items } = req.body;

  try {
    // Find the cart by userId
    let cart = await Cart.findOne({ userId });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Replace the existing items array with the new one
    cart.items = items;

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + item.meal_price * item.item_count;
    }, 0);

    // If the cart is empty, delete it from the database
    if (cart.items.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({ message: "Cart is empty, deleted" });
    }

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while saving the cart" });
  }
};

module.exports = {
  getUserCart,
  saveCart
};
