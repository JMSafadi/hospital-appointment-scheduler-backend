const express = require('express')
const router = express.Router()

const pool = require('../db/database')

// Get hospitals
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Hospitals')
    res.status(200).json(result.rows)
  } catch (err) {
    console.log('Error fetching Hospitals:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
