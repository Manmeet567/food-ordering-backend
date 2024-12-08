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
  const { userId, itemId, item_name, item_price, item_img, item_count } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);

    if (itemIndex > -1) {
      // If item exists and count is 0, remove the item
      if (item_count === 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        // Otherwise, update the item's count
        cart.items[itemIndex].item_count = item_count;
      }
    } else if (item_count > 0) {
      // If the item doesn't exist and count is greater than 0, add it
      cart.items.push({
        itemId,
        item_name,
        item_price,
        item_img,
        item_count,
      });
    }

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce((total, item) => {
      return total + item.item_price * item.item_count;
    }, 0);

    // If the cart is empty, delete it
    if (cart.items.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({ message: 'Cart is empty, deleted' });
    }

    // Save the updated cart
    await cart.save();
    return res.status(200).json(cart);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while saving the cart' });
  }
};

module.exports = {
  getUserCart,
  saveCart
};
