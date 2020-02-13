const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    EGN: {
      type: Number,
      required: true,
    },
    accounts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Account',
      },
    ],
    payments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
      },
    ],
    phoneNumber: Number,
    address: String,
    avatar: String,
  },
  {
    timestamps: true,
  },
)

const User = model('User', userSchema)

module.exports = User
