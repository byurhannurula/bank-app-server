const User = require('../schemas/user')

exports.register = async (req, res) => {
  const { email } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    throw new Error('Email already exists!')
  }

  const newUser = await User.create(req.body)

  res.status(201).json({ id: newUser.id })
}

exports.login = async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })
  const pass = await user.validatePassword(req.body.password)

  if (!user || !pass) {
    throw new Error('Incorrect email or password. Please try again.')
  }

  res.status(201).json({ user })
}

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id)

  const data = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }

  res.status(201).json({ data })
}
