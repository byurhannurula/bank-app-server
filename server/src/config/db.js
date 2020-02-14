const mongoose = require('mongoose')

const { DB_USER, DB_PASS, DB_ENDPOINT } = process.env

exports.dbConnection = async () => {
  await mongoose
    .connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_ENDPOINT}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`— DB Connected!`))
    .catch(err => console.log(`— DB error: ${err}`))
}
