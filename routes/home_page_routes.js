const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const {getHomePageData} = require('../controllers/homePageController');

const router = express.Router()

router.use(requireAuth)

router.get('/data', getHomePageData);

module.exports = router;