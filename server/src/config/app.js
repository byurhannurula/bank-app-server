const session = require('express-session')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')

const { store } = require('./redis')
const User = require('../schemas/user')

const app = express()

const dev = process.env.NODE_ENV === 'development'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
)

// decode the JWT so we can get the user Id on each request
app.use((req, _, next) => {
  const { token } = req.headers
  if (token) {
    const { id } = jwt.verify(token, process.env.JWT_TOKEN)
    // put the userId onto the req for future requests to access
    req.userId = id
  }
  next()
})

// 2. Create a middleware that populates the user on each request
app.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next()
  const user = await User.findById(req.userId)
  req.user = user
  next()
})

app.use(
  session({
    store,
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    // cookie: {
    //   secure: !dev,
    //   httpOnly: true,
    //   maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    // },
  }),
)

app.use((req, _, next) => {
  if (!req.session) {
    return next(new Error('Redis connection lost!'))
  }
  next()
})

exports.app = app
