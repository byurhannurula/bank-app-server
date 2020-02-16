const { Schema, model } = require('mongoose')

const paymentSchema = new Schema(
  {
    IBAN_sender: String,
    IBAN_beneficiary: String,
    value: Number,
    currency: {
      type: String,
      enum: ['BGN', 'EUR', 'USD'],
      default: 'BGN',
    },
    reason: String,
    status: String,
  },
  {
    timestamps: true,
  },
)

const Payment = model('Payment', paymentSchema)

module.exports = Payment
