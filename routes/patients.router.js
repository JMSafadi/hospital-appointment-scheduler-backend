const express = require('express')
const router = express.Router()

const pool = require('../db/database')

// Create new patient
router.post('/', async (req, res) => {

})

// Get patients
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Patients')
    res.status(200).json(result.rows)
  } catch (err) {
    console.log('Error fetching Patients:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
