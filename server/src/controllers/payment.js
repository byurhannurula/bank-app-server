const axios = require('axios')
const Account = require('../models/account')
const Payment = require('../models/payment')
const { responseData } = require('../util/formatter')

const paymentData = data => {
  return {
    id: data.id,
    IBAN_sender: data.IBAN_sender,
    IBAN_beneficiary: data.IBAN_beneficiary,
    value: data.value,
    currency: data.currency,
    reason: data.paymentReason,
    status: data.userStatus,
    createdAt: data.createdAt,
  }
}

exports.makePayment = async (req, res) => {
  let isSender = false
  let isBeneficiary = false

  let senderAcc = null
  let benefAcc = null

  if (req.body.IBAN_sender.substr(0, 3) === process.env.MY_BANK_ID) {
    isSender = true
  }

  if (req.body.IBAN_beneficiary.substr(0, 3) === process.env.MY_BANK_ID) {
    isBeneficiary = true
  }

  if (isSender) {
    senderAcc = await Account.findOne({
      IBAN: req.body.IBAN_sender,
    })

    if (!senderAcc) {
      return res
        .status(400)
        .send(responseData('fail', 'Invalid sender account!'))
    }
  }

  if (isBeneficiary) {
    benefAcc = await Account.findOne({
      IBAN: req.body.IBAN_beneficiary,
    })

    if (!benefAcc) {
      return res
        .status(400)
        .send(responseData('fail', 'Invalid benficiary account!'))
    }
  }

  const newPayment = await new Payment({
    ...req.body,
  })

  if (isSender && !isBeneficiary) {
    const isValidBank = await axios.get(
      `${process.env.CENTRAL_SERVER}/${req.body.IBAN_sender}`,
    )

    console.log(isValidBank)

    return res.status(400).send(responseData('fail', 'Invalid bank IBAN!'))
  }

  if (senderAcc.balance >= req.body.value) {
    await Account.findOneAndUpdate(
      { IBAN: req.body.IBAN_sender },
      {
        balance: senderAcc.balance - req.body.value,
        updatedAt: Date(),
      },
    )
    await Account.findOneAndUpdate(
      { IBAN: req.body.IBAN_beneficiary },
      {
        balance: benefAcc.balance + req.body.value,
        updatedAt: Date(),
      },
    )
    newPayment.status = 'Completed'
    newPayment.save()
    return res.status(200).send(responseData('ok'))
  }
  if (senderAcc.balance < req.body.value) {
    return res
      .status(200)
      .send(responseData('fail', 'Account balance is smaller than the value!'))
  }

  return res.status(400).send(responseData('fail'))
}

// TODO: Get payment by search string
exports.getSearchedPayment = async (req, res) => {}

exports.getPayment = async (req, res) => {
  const payment = await Payment.findById(req.params.id)

  return res.status(200).send({ data: paymentData(payment) })
}

exports.getPayments = async (req, res) => {
  const payments = await Payment.find({})

  return res.status(200).send({ data: payments })
}
