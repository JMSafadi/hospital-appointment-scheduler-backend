const express = require('express')
const fs = require('fs')
const path = require('path')
const pool = require('../db/database')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    // Read SQL initialize file and execute query
    const sqlFilePath = path.join(__dirname, 'initializa_db.sql')
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8')
    await pool.query(sqlScript)
    res.status(200).json({ message: 'DB Initialized succesfully.' })
  } catch (err) {
    console.log(`Error: ${err}`)
    res.status(500).json({ message: 'Error initializing DB' })
  }
})

module.exports = router