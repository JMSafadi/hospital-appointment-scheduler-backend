const express = require('express')
const controller = require('./controller')
const { authenticateToken } = require('../../middlewares/authenticateToken')

const router = express.Router()

// HTTP Requests
router.get('/', (req, res) => {
  res.send({ message: 'Welcome to Hospital Appointment Scheduler API.' })
})

router.post('/', authenticateToken, controller.initializeDb)

module.exports = router
