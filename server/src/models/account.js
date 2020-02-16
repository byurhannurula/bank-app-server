const { Schema, model } = require('mongoose')

const accountSchema = new Schema(
  {
    IBAN: {
      type: String,
      unique: true,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Card',
      },
    ],
    balance: {
      type: Number,
      default: 0.0,
    },
    currency: {
      type: String,
      enum: ['BGN', 'EUR', 'USD'],
      default: 'BGN',
    },
    accountType: {
      type: String,
      enum: ['Current', 'Savings', 'Credit', 'ISIC'],
      default: 'Current',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  },
)

const Account = model('Account', accountSchema)

module.exports = Account
