const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')

const User = require('../schemas/user')
const { logOut } = require('../util/auth')
const { userData, errorData } = require('./helpers')
const { loginSchema, registerSchema } = require('../util/yupValidation')

exports.register = async (req, res) => {
  try {
    await registerSchema.validate(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(422).send({ error: errorData(err) })
  }

  const userExists = await User.findOne({ email: req.body.email })

  if (userExists) return res.status(400).send('Email already exists!')

  const avatar = await gravatar.url(req.body.email, {
    protocol: 'http',
    size: '200',
    rating: 'pg',
    default: 'identicon',
  })

  const newUser = await User.create({ ...req.body, avatar })

  // req.session.userId = newUser.id

  // Create and assign jwt token
  const token = jwt.sign({ id: newUser.id }, process.env.JWT_TOKEN, {
    expiresIn: '7d',
  })

  return res
    .status(200)
    .header('token', token)
    .json({ id: newUser.id })
}

exports.login = async (req, res) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(422).send({ error: errorData(err) })
  }

  const user = await User.findOne({ email: req.body.email })
  const pass = await user.validatePassword(req.body.password)

  if (!user || !pass) {
    return res
      .status(400)
      .send('Incorrect email or password. Please try again.')
  }

  // req.session.userId = user.id

  // Create and assign jwt token
  const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN, {
    expiresIn: '7d',
  })

  return res
    .status(200)
    .header('token', token)
    .json({ data: userData(user) })
}

exports.logout = async (req, res) => {
  logOut(req, res)
}

exports.getUser = async (req, res) => {
  const user = await User.findById(req.session.userId)

  return res.status(200).json({ data: userData(user) })
}

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id)

  return res.status(200).json({ data: userData(user) })
}
