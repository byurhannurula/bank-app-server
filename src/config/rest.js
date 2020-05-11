const session = require('express-session')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const { store } = require('./redis')

const app = express()

const dev = process.env.NODE_ENV === 'development'

app.set('trust proxy', 1)
app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, _, next) => {
  const { authorization } = req.headers

  if (authorization) {
    try {
      const sessionId = authorization.split(' ')[1]
      req.headers.cookie = `sessionId=${sessionId}`
    } catch (err) {
      console.log(err)
    }
  }

  return next()
})

app.use(
  session({
    store,
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: !dev,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  }),
)

app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
  }),
)

// Handle redis connection lost
app.use((req, _, next) => {
  if (!req.session) {
    return next(new Error('Redis connection lost!'))
  }
  return next()
})

exports.app = app
