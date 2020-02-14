const Account = require('../schemas/account')

exports.createAccount = async (req, res) => {
  const { IBAN } = req.body

  const accountExists = await Account.findOne({ IBAN })

  if (accountExists) {
    throw new Error('Account with this IBAN already exists!')
  }

  const newAccount = await Account.create(req.body)

  return res.status(200).json({ data: newAccount })
}

exports.getAccounts = async (req, res) => {
  const accounts = await Account.find({})

  return res.status(200).json({ data: accounts })
}

exports.getAccount = async (req, res) => {
  const account = await Account.findById(req.params.iban)

  console.log(account)

  // return res.status(200).json({ data: accounts })
}
