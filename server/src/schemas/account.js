const { Schema, model } = require('mongoose')

const accountSchema = new Schema(
  {
    IBAN: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    balance: Number,
    currency: {
      type: String,
      enum: ['BGN', 'EUR', 'USD'],
      default: 'BGN',
      required: true,
    },
    accountType: {
      type: String,
      enum: ['Current', 'Savings', 'Credit', 'ISIC'],
      default: 'Current',
      required: true,
    },
    status: String,
  },
  {
    timestamps: true,
  },
)

const Account = model('Account', accountSchema)

module.exports = Account
