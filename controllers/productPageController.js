const mongoose = require('mongoose');
const Restaurant = require('../models/restaurantModel');

const getProductPageData = async (req, res) => {
  try {
    // Check if the models are already compiled, if so, use them, otherwise define them
    const Offers = mongoose.models.offers || mongoose.model('offers', new mongoose.Schema({}, { strict: false }));
    const Categories = mongoose.models.categories || mongoose.model('categories', new mongoose.Schema({}, { strict: false }));
    const Reviews = mongoose.models.reviews || mongoose.model('reviews', new mongoose.Schema({}, { strict: false }));

    // Execute all queries in parallel
    const [offersData, categoriesData, reviewsData] = await Promise.all([
      Offers.find({}),
      Categories.find({}),
      Reviews.find({})
    ]);

    // Send all data in one response
    res.status(200).json({
      offers: offersData,
      categories: categoriesData,
      reviews: reviewsData
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product page data' });
  }
};

const getRestaurantBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const restaurant = await Restaurant.findOne({ restaurant_slug: slug });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    return res.status(200).json({ restaurant });
  } catch (error) {
    console.error("Error fetching restaurant by slug:", error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProductPageData,
  getRestaurantBySlug
};
