const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Review schema
const reviewSchema = new Schema(
  {
    customer_name: { type: String, required: true },
    customer_city: { type: String, required: true },
    customer_img: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    review_date: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
