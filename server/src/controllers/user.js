const gravatar = require('gravatar')

const User = require('../schemas/user')
const { logOut } = require('../util/auth')
const { loginSchema, registerSchema } = require('../util/yupValidation')

const userData = data => {
  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    avatar: data.avatar,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}

exports.register = async (req, res) => {
  try {
    await registerSchema.validate(req.body, { abortEarly: false })
  } catch (err) {
    return err
  }

  const userExists = await User.findOne({ email: req.body.email })

  if (userExists) {
    throw new Error('Email already exists!')
  }

  const avatar = await gravatar.url(req.body.email, {
    protocol: 'http',
    size: '200',
    rating: 'pg',
    default: 'identicon',
  })

  const newUser = await User.create({ ...req.body, avatar })

  req.session.userId = newUser.id

  return res.status(200).json({ id: newUser.id })
}

exports.login = async (req, res) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false })
  } catch (err) {
    return err
  }

  const user = await User.findOne({ email: req.body.email })
  const pass = await user.validatePassword(req.body.password)

  if (!user || !pass) {
    throw new Error('Incorrect email or password. Please try again.')
  }

  req.session.userId = user.id

  return res.status(200).json({ data: userData(user) })
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
