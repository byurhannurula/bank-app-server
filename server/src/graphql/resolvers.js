const gravatar = require('gravatar')
const { errorData } = require('../helpers')
const { isAuthenticated, logOut } = require('../util/auth')
const { loginSchema, registerSchema } = require('../util/yupValidation')

module.exports = {
  Query: {
    // Users
    me: async (parent, args, { req, models }, info) => {
      isAuthenticated(req)
      const user = await models.User.findById(req.session.userId)

      return user
    },
    user: async (parent, { id }, { req, models }, info) => {
      isAuthenticated(req)
      const user = await models.User.findById(id)

      return user
    },
    users: async (parent, args, { req, models }, info) => {
      isAuthenticated(req)
      const users = await models.User.find({})

      return users
    },
  },
  Mutation: {
    // Users
    register: async (parent, args, { req, models }, info) => {
      try {
        await registerSchema.validate(args, { abortEarly: false })
      } catch (err) {
        return { error: errorData(err) }
      }

      const userExists = await models.User.findOne({ email: args.email })

      if (userExists) return new Error('Email already exists!')

      const avatar = await gravatar.url(args.email, {
        protocol: 'http',
        size: '200',
        rating: 'pg',
        default: 'identicon',
      })

      const user = await models.User.create({ ...args, avatar })

      req.session.userId = user.id

      return user
    },
    login: async (parent, args, { req, models }, info) => {
      const { email, password } = args

      try {
        await loginSchema.validate(args, { abortEarly: false })
      } catch (err) {
        return { error: errorData(err) }
      }

      const user = await models.User.findOne({ email })

      if (!user || !(await user.validatePassword(password))) {
        throw new Error('Incorrect email or password. Please try again.')
      }

      req.session.userId = user.id

      return user
    },
    logOut: (parent, args, { req, res }, info) => {
      return logOut(req, res)
    },
    updateUser: async (parent, args, { req, models }, info) => {
      isAuthenticated(req)

      const avatar = await gravatar.url(args.email, {
        protocol: 'http',
        size: '200',
        rating: 'pg',
        default: 'identicon',
      })

      const updatedUser = await models.User.findOneAndUpdate(
        { _id: args.id },
        {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          sss: args.ssn,
          avatar,
          password: args.password,
          updatedAt: Date(),
        },
      )

      return updatedUser
    },
  },
}
