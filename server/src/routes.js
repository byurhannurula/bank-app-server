const express = require('express')

const userController = require('./controllers/user')
const paymentController = require('./controllers/payment')
const accountController = require('./controllers/account')

const router = express.Router()

router.post('/api/register', userController.register)
router.post('/api/login', userController.login)
router.get('/api/user/:id', userController.getUser)

router.post('/api/makePayment', paymentController.makePayment)
router.post('/api/payments', paymentController.getPayments)
router.get('/api/payment/:id', paymentController.getPayment)
router.post('/api/payments/:query', paymentController.getSearchedPayment)

router.post('/api/createAccount', accountController.createAccount)
router.post('/api/accounts', accountController.getAccounts)
router.get('/api/account/:iban', accountController.getAccount)

module.exports = router
