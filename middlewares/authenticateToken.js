const jwt = require('../lib/jwt')

const authenticateToken = (req, res , next) => {
  const token = req.header('x-auth-token')
  if (!token) return res.sendStatus(401)
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
     req.user = user
     next()
  } catch(err) {
    res.status(403).json({ message: 'Invalid token.' })
  }
}

module.exports = {
  authenticateToken
}
