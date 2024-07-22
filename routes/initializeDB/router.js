const express = require('express')
const controller = require('./controller')

const router = express.Router()

// HTTP Requests
router.get('/', (req, res) => {
  res.send({ message: 'API Route' })
})
router.post('/', controller.initializeDb)

module.exports = router
