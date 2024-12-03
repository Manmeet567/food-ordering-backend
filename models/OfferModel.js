const mongoose = require('mongoose');
const { Schema } = mongoose;

const offerSchema = new Schema({
  offer_discount: { type: Number, required: true },
  offer: { type: String, required: true },
  offer_restaurant: { type: String, required: true },
  img: { type: String, required: true },
}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
