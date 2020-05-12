const redis = require('redis')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const redisClient = new redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS,
})
redisClient.unref()
redisClient.on('error', console.log)

const store = new RedisStore({ client: redisClient })

module.exports = {
  store,
  redis: redisClient,
}
