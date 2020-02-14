exports.isAuthenticated = req => {
  if (!req || !req.session || !req.session.userId) {
    // user is not logged in
    throw new Error('Not authenticated!')
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
