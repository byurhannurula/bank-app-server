const express = require('express')

const userController = require('./controllers/user')
const paymentController = require('./controllers/payment')

const router = express.Router()

router.post('/api/register', userController.register)
router.post('/api/login', userController.login)
router.get('/api/:id', userController.getUser)

router.post('/api/makePayment', paymentController.makePayment)
router.post('/api/payments', paymentController.getPayments)
router.get('/api/payment/:id', paymentController.getPayment)
router.post('/api/payments/:query', paymentController.getSearchedPayment)

// router.get('/api/account', controller())
// router.get('/api/accounts', controller())
// router.get('/api/accounts/<iban>', controller())

module.exports = router
