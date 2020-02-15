const jwt = require('jsonwebtoken')

exports.verifyAuth = (req, res, next) => {
  const { token } = req.headers
  if (!token) return res.status(401).send('Access denied!')

  try {
    const { id } = jwt.verify(token, process.env.JWT_TOKEN)
    req.user = id
    next()
  } catch (error) {
    return res.status(400).send('Invalid token!')
  }
}

exports.isAuthenticated = (req, res) => {
  if (!req || !req.session || !req.session.userId) {
    // user is not logged in
    res.status(400).send('Not authenticated!')
  }
}

exports.logOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err)

      res.clearCookie(process.env.SESS_NAME)

      resolve(true)
    })
  })
