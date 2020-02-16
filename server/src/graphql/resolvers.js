const gravatar = require('gravatar')
const { errorData, responseData } = require('../helpers')
const { randomIban } = require('../util/random')
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

    // Card
    card: async (parent, { id }, { req, models }, info) => {
      isAuthenticated(req)
      const card = await models.Card.findById({
        id,
        holder: req.session.userId,
      })

      return card
    },
    cards: async (parent, args, { req, models }, info) => {
      isAuthenticated(req)
      const cards = await models.Card.find({ holder: req.session.userId })

      return cards
    },

    // Account
    account: async (parent, { iban }, { req, models }, info) => {
      isAuthenticated(req)
      const account = await models.Account.find({
        IBAN: iban,
        owner: req.session.userId,
      })

      return account
    },
    accounts: async (parent, args, { req, models }, info) => {
      isAuthenticated(req)
      const accounts = await models.Account.find({
        owner: req.session.userId,
      })

      return accounts
    },

    // Payment
    payment: async (parent, { id }, { req, models }, info) => {
      isAuthenticated(req)
      const payment = await models.Payment.findById(id)

      return payment
    },
    payments: async (parent, args, { req, models }, info) => {
      isAuthenticated(req)
      const payments = await models.Payment.find({})

      return payments
    },
    searchPayment: async (parent, { query }, { req, models }, info) => {
      isAuthenticated(req)

      const payments = await models.Payment.find({
        results: {
          $elemMatch: {
            IBAN_sender: query,
            IBAN_beneficiary: query,
            createdAt: query,
          },
        },
      })

      return payments
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

    // Account
    createAccount: async (parent, args, { req, models }, info) => {
      isAuthenticated(req)

      const account = await models.Account.create({
        owner: req.session.userId,
        IBAN: randomIban(18),
        ...args,
      })

      return account
    },
    updateAccount: async (parent, args, { req, models }, info) => {
      isAuthenticated(req)

      const updatedAccount = await models.Account.findOneAndUpdate(
        { owner: req.session.userId, IBAN: args.IBAN },
        {
          balance: args.balance,
          updatedAt: Date(),
          ...args,
        },
      )

      return updatedAccount
    },

    // Payment
    makePayment: async (parent, args, { req, models }, info) => {
      isAuthenticated(req)

      const senderAcc = await models.Account.findOne({
        owner: req.session.userId,
        IBAN: args.IBAN_sender,
      })

      const benefAcc = await models.Account.findOne({
        IBAN: args.IBAN_beneficiary,
      })

      const newPayment = await new models.Payment({
        ...args,
        currency: senderAcc.currency,
      })

      if (senderAcc.balance >= args.value) {
        await models.Account.findOneAndUpdate(
          { IBAN: args.IBAN_sender },
          {
            balance: senderAcc.balance - args.value,
            updatedAt: Date(),
          },
        )
        await models.Account.findOneAndUpdate(
          { IBAN: args.IBAN_beneficiary },
          {
            balance: benefAcc.balance + args.value,
            updatedAt: Date(),
          },
        )
        newPayment.status = 'Completed'
        newPayment.save()
        return responseData('ok')
      }

      return responseData('fail')
    },
  },

  // Relations
  Account: {
    owner: async (user, args, { req }, info) => {
      return (await user.populate('owner').execPopulate()).owner
    },
    cards: async (cards, args, { req }, info) => {
      return (await cards.populate('cards').execPopulate()).cards
    },
  },
  Card: {
    holder: async (user, args, { req }, info) => {
      return (await user.populate('holder').execPopulate()).holder
    },
    account: async (account, args, { req }, info) => {
      return (await account.populate('account').execPopulate()).account
    },
  },
}
