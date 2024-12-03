const Cart = require("../models/Cart");

const getUserCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate(
      "items.itemId",
      "name price img"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve cart", error });
  }
};

module.exports = {
  getUserCart,
};
