const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const {getHomePageData, getRestaurants} = require('../controllers/homePageController');

const router = express.Router()

router.use(requireAuth)

router.get('/data', getHomePageData);

router.get('/restaurants', getRestaurants);

module.exports = router;