const express = require('express')
const paymentController = require('../controllers/payment')

const router = express.Router()

router.post('/api/payment', paymentController.makePayment)
router.get('/api/payment/:id', paymentController.getPayment)

module.exports = router
