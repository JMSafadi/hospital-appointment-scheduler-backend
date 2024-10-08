require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('../../lib/jwt')
const queries = require('./queries')

const loginPatient = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  let client
  try {
    client = await pool.connect()
    const { email, password } = req.body
    // Check if patient already exists
    const results = await client.query(queries.checkEmailExists, [email])
    // If patient doens't exists
    if (!results.rows.length) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }
    const user = results.rows[0]
    // Compare database and request body passwords
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }
    // Generate JWT providing payload and secret
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET
    )
    res.status(200).json({ message: 'Logged in successfully.', jwt: token })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  } finally {
    if (client) client.release()
  }
}

module.exports = {
  loginPatient
}
