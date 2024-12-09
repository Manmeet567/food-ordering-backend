const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      // meal_id: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'Meals',
      //   required: true,
      // },
      meal_name: { type: String, required: true },
      meal_price: { type: Number, required: true },
      meal_img: { type: String },
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
