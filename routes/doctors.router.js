const express = require('express')
const router = express.Router()

const { Doctor } = require('../models')

// Get doctor
router.get('/', (req, res) => {
  res.json('Doctors router')
})

module.exports = router