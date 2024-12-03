const mongoose = require("mongoose");
const Restaurant = require("../models/restaurantModel");
const Offer = require("../models/OfferModel");
const Category = require("../models/categoryModel");
const Review = require("../models/ReviewModel");
const Meal = require('../models/MealModel');

const getProductPageData = async (req, res) => {
  try {
    const [offersData, categoriesData, reviewsData] = await Promise.all([
      Offer.find({}),
      Category.find({}).populate('meals'),
      Review.find({}),
    ]);

    res.status(200).json({
      offers: offersData,
      categories: categoriesData,
      reviews: reviewsData,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to fetch product page data" });
  }
};

const getRestaurantBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const restaurant = await Restaurant.findOne({ restaurant_slug: slug });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json({ restaurant });
  } catch (error) {
    console.error("Error fetching restaurant by slug:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProductPageData,
  getRestaurantBySlug,
};
