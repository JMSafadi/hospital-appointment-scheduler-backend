const express = require('express')
const db = require('../db/database')

const router = express.Router()

// Get doctor
router.get('/', (req, res) => {
  res.json('Doctors router')
})

module.exports = router