const { Schema, model } = require('mongoose')

const cardSchema = new Schema(
  {
    cvc: Number,
    number: String,
    validUntil: Number,
    holder: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
    },
    type: {
      type: String,
      enum: ['VISA', 'MASTER'],
      default: 'VISA',
    },
    status: String,
  },
  {
    timestamps: true,
  },
)

const Card = model('Card', cardSchema)

module.exports = Card
