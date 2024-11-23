const mongoose = require('mongoose');

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

module.exports = {
  getProductPageData
};
