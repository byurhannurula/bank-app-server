const axios = require('axios')
const User = require('../models/user')
const Account = require('../models/account')
const Payment = require('../models/payment')
const { responseData } = require('../util/formatter')

const { CENTRAL_SERVER, MY_BANK_ID } = process.env

const paymentData = (data) => {
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

  const senderIban = req.body.IBAN_sender
  const receiverIban = req.body.IBAN_beneficiary

  if (senderIban.substr(0, 3) === MY_BANK_ID) isSender = true
  if (receiverIban.substr(0, 3) === MY_BANK_ID) isBeneficiary = true

  if (isSender) {
    senderAcc = await Account.findOne({ IBAN: senderIban })

    if (!senderAcc) {
      return res
        .status(400)
        .send(responseData('fail', 'Invalid sender account!'))
    }

    if (senderAcc.balance < req.body.value) {
      return res
        .status(400)
        .send(responseData('fail', 'Not enough money on account!'))
    }
  }

  if (isBeneficiary) {
    benefAcc = await Account.findOne({ IBAN: receiverIban })

    if (!benefAcc) {
      return res
        .status(400)
        .send(responseData('fail', 'Invalid benficiary account!'))
    }
  }

  if (isSender && isBeneficiary) {
    await Account.findOneAndUpdate(
      { IBAN: senderIban },
      {
        balance: senderAcc.balance - req.body.value,
        updatedAt: Date(),
      },
    )
    await Account.findOneAndUpdate(
      { IBAN: receiverIban },
      {
        balance: benefAcc.balance + req.body.value,
        updatedAt: Date(),
      },
    )
    const newPayment = await Payment.create({
      ...req.body,
      status: 'Completed',
    })

    await User.findOneAndUpdate(
      { _id: req.session.userId },
      { $push: { payments: newPayment } },
    )

    await User.findOneAndUpdate(
      { _id: benefAcc.owner._id },
      { $push: { payments: newPayment } },
    )

    return res.status(200).send(responseData('ok'))
  }

  if (isSender && !isBeneficiary) {
    // Check if the beneficiary account is valid and get it's serviceURL
    const bankAddress = await axios.get(`${CENTRAL_SERVER}/${receiverIban}`)
    console.log(bankAddress.data)
    if (senderAcc.balance >= req.body.value) {
      let isSuccess
      if (bankAddress.data) {
        isSuccess = await axios.post(`${bankAddress.data.serviceURL}/payment`, {
          data: req.body,
        })
      }

      if (isSuccess.statusText === 'OK') {
        // Update sender account - decrease the amount from balance
        await Account.findOneAndUpdate(
          { IBAN: senderIban },
          {
            balance: senderAcc.balance - req.body.value,
            updatedAt: Date(),
          },
        )

        // Create and save new payment to the DB, set status to 'Completed'
        const newPayment = await Payment.create({
          ...req.body,
          status: 'Completed',
        })

        // Push the new payment to the senders account
        await User.findOneAndUpdate(
          { _id: req.session.userId },
          { $push: { payments: newPayment } },
        )

        return res.status(200).send(responseData('ok'))
      }

      return res.status(400).send(responseData('fail', 'Something went wrong!'))
    }
  }

  return res.status(400).send(responseData('fail', 'Something went wrong!'))
}

exports.getPayment = async (req, res) => {
  const payment = await Payment.findById(req.params.id)

  return res.status(200).send({ data: paymentData(payment) })
}
