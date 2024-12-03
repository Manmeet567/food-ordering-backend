const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const {getUserCart} = require('../controllers/cartController');

const router = express.Router();

router.use(requireAuth);

router.get('/:userId', getUserCart);


module.exports = router;