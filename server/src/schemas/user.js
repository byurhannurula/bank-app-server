const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      lowercase: true,
    },
    password: String,
    SSN: Number,
    phoneNumber: Number,
    address: String,
    avatar: String,
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password)
}

const User = model('User', userSchema)

module.exports = User
