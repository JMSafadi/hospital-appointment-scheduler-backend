const bcrypt = require('bcryptjs')
const queries = require('./queries')

// Method to POST new patient
const addPatient = async (req, res) => {
  try {
    const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
    const { name, email, password } = req.body
    // Check if patient already exists
    const client = await pool.connect()
    const results = await client.query(queries.checkEmailExists, [email])
    if (results.rows.length) {
      return res.status(409).json({ message: 'Email already exists.' })
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    // Add patient if not exists
    await client.query(queries.addPatient, [name, email, hashedPassword])
    client.release()
    res.status(201).json({ message: 'Patient added successfully.' })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

module.exports = {
  addPatient
}
