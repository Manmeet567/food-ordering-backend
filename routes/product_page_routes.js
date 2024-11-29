const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const {getProductPageData, getRestaurantBySlug} = require('../controllers/productPageController');

const router = express.Router()

router.use(requireAuth)

router.get('/data', getProductPageData);

router.get('/restaurant/:slug', getRestaurantBySlug)

module.exports = router;