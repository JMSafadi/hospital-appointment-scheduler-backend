const express = require('express')
const controller = require('./controller')
const { authenticateToken } = require('../../middleware/authenticateToken')

const router = express.Router()

// HTTP requests
router.get('/', authenticateToken, controller.getAppointments)
router.get('/:id', authenticateToken, controller.getAppointmentsById)

router.post('/', (req, res) => {
  
})

module.exports = router