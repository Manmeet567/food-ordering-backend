const mongoose = require("mongoose");
const { Schema } = mongoose;

const mealSchema = new Schema(
  {
    meal_name: { type: String, required: true },
    meal_desc: { type: String, required: true },
    meal_price: { type: Number, required: true },
    meal_img: { type: String, required: true },
  },
  { timestamps: true }
);

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
