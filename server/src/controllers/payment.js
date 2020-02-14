const Payment = require('../schemas/payment')

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
  const payment = await Payment.create(req.body)

  return res.status(200).send({ data: paymentData(payment) })
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
