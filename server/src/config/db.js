const mongoose = require('mongoose')

exports.dbConnection = async () => {
  await mongoose
    .connect(`mongodb://${process.env.DB_URL}/${process.env.DB_PORT}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB Connected!`))
    .catch(err => console.log(`DB error: ${err}`))
}
