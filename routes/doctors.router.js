const express = require('express')
const pool = require('../db/database')

const router = express.Router()

// Get doctor
router.get('/', async (req, res) => {

  const queryTest = 'CREATE TABLE doctors (id SERIAL PRIMARY KEY, name VARCHAR(100))'

  try {
    await pool.query(queryTest)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }

})

module.exports = router
