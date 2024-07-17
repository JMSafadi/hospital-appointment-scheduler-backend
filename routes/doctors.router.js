const express = require('express')
const pool = require('../db/database')

const router = express.Router()

// Get doctors
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Doctors')
    res.status(200).json(result.rows)
  } catch (err) {
    console.log('Error fetching doctors:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
