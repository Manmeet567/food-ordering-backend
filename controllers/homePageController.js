const mongoose = require('mongoose');

const getHomePageData = async (req, res) => {
  try {
    // Check if the models are already compiled, if so, use them, otherwise define them
    const Restaurants = mongoose.models.restaurants || mongoose.model('restaurants', new mongoose.Schema({}, { strict: false }));
    const Deals = mongoose.models.deals || mongoose.model('deals', new mongoose.Schema({}, { strict: false }));
    const PopularCategories = mongoose.models.popular_categories || mongoose.model('popular_categories', new mongoose.Schema({}, { strict: false }));
    const Opportunities = mongoose.models.opportunities || mongoose.model('opportunities', new mongoose.Schema({}, { strict: false }));

    // Execute all queries in parallel
    const [restaurantsData, dealsData, popularCategoriesData, opportunitiesData] = await Promise.all([
      Restaurants.find({}),
      Deals.find({}),
      PopularCategories.find({}),
      Opportunities.find({})
    ]);

    // Send all data in one response
    res.status(200).json({
      restaurants: restaurantsData,
      deals: dealsData,
      popularCategories: popularCategoriesData,
      opportunities: opportunitiesData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

module.exports = {
  getHomePageData,
};
