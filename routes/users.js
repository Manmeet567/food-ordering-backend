const express = require('express')
const { signupUser, loginUser, addAddress, addPaymentMethod, getUser } = require('../controllers/userController')
const requireAuth = require('../middlewares/requireAuth')
 
const router = express.Router()

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.post('/add-address', requireAuth, addAddress)

router.post('/add-payment-method', requireAuth, addPaymentMethod)

router.get('/:userId', requireAuth, getUser)


module.exports = router