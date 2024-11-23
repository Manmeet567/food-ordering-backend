const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const {getProductPageData} = require('../controllers/productPageController');

const router = express.Router()

router.use(requireAuth)

router.get('/data', getProductPageData);

module.exports = router;