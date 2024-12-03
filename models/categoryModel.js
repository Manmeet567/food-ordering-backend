const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  category_name: { type: String, required: true },
  meals: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
