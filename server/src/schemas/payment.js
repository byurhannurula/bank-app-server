const { Schema, model } = require('mongoose')

const paymentSchema = new Schema(
  {
    IBAN_receiver: {
      type: String,
      required: true,
    },
    IBAN_beneficiary: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ['BGN', 'EUR', 'USD'],
      default: 'BGN',
      required: true,
    },
    paymentReason: {
      type: String,
      required: true,
    },
    userStatus: String,
    serverStatus: String,
  },
  {
    timestamps: true,
  },
)

const Payment = model('Payment', paymentSchema)

module.exports = Payment
