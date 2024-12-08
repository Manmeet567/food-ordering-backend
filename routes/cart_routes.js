const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const {getUserCart, saveCart} = require('../controllers/cartController');

const router = express.Router();

router.use(requireAuth);

router.get('/:userId', getUserCart);

router.post('/save-cart', saveCart);


module.exports = router;