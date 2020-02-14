require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const { dbConnection } = require('./config/db')
const { app } = require('./config/app')
const routes = require('./routes')

const port = process.env.PORT || 4000

const initServer = async () => {
  console.clear()

  await dbConnection()

  app.use('/', routes)

  app.listen(port, () => {
    console.log(`— Server is running: http://127.0.0.1:${port}`)
  })
}

initServer()
