const express = require('express')
const controller = require('./controller')

const router = express.Router()

// HTTP Requests
router.post('/', controller.initializeDb)

module.exports = router
