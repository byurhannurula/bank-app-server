const express = require('express')

const userController = require('./controllers/user')

const router = express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)

// router.get('/api/user', controller())
// router.get('/api/users', controller())

// router.post('/api/payments', controller())
// router.get('/api/payments', controller())
// router.get('/api/payments/<search_string>', controller())

// router.get('/api/account', controller())
// router.get('/api/accounts', controller())
// router.get('/api/accounts/<iban>', controller())

module.exports = router
