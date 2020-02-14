const User = require('../schemas/user')

exports.register = async (req, res) => {
  const { email } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    throw new Error('Email already exists!')
  }

  User.create(req.body)
    .then(result => res.status(201).json({ id: result.id }))
    .catch(err => console.log(err))
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
