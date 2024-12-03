const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true,
      },
      item_name: { type: String, required: true },
      item_price: { type: Number, required: true },
      item_img: { type: String },
      item_count: { type: Number, default: 1 },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  }
} ,{timestamps:true});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
