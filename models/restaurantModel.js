const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  restaurant_name: { type: String, required: true },
  restaurant_img: { type: String, required: true },
  restaurant_slug: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);