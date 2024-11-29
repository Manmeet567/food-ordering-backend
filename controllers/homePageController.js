const mongoose = require('mongoose');

const getHomePageData = async (req, res) => {
  try {
    const Deals = mongoose.models.deals || mongoose.model('deals', new mongoose.Schema({}, { strict: false }));
    const PopularCategories = mongoose.models.popular_categories || mongoose.model('popular_categories', new mongoose.Schema({}, { strict: false }));
    const Opportunities = mongoose.models.opportunities || mongoose.model('opportunities', new mongoose.Schema({}, { strict: false }));

    const [dealsData, popularCategoriesData, opportunitiesData] = await Promise.all([
      Deals.find({}),
      PopularCategories.find({}),
      Opportunities.find({})
    ]);

    res.status(200).json({
      deals: dealsData,
      popularCategories: popularCategoriesData,
      opportunities: opportunitiesData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const Restaurants = mongoose.models.restaurants || mongoose.model('restaurants', new mongoose.Schema({}, { strict: false }));

    const restaurantsData = await Restaurants.find({});
    res.status(200).json({ restaurants: restaurantsData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurants data' });
  }
};

module.exports = {
  getHomePageData,
  getRestaurants
};
