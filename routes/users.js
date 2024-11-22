const express = require('express')
const { signupUser, loginUser, addAddress, addPaymentMethod } = require('../controllers/userController')
const requireAuth = require('../middlewares/requireAuth')
 
const router = express.Router()

router.post('/login', loginUser)

router.post('/signup', signupUser)

router.post('/add-address', requireAuth, addAddress)

router.post('/add-payment-method', requireAuth, addPaymentMethod)


module.exports = router