const express = require('express')
const db = require('../db/database')

const router = express.Router()

// Get doctor
router.get('/', (req, res) => {
  const selectQuery = 'SELECT * from Doctors'
  db.query(selectQuery, (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(result)
  })
})

module.exports = router