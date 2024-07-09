const express = require('express')
const router = express.Router()

// Get appointments
router.get('/', (req, res) => {
  res.json('appointments router')
})

module.exports = router