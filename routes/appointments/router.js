const express = require('express')
const controller = require('./controller')
const { authenticateToken } = require('../../middlewares/authenticateToken')

const router = express.Router()

// HTTP requests
router.get('/', authenticateToken, controller.getAppointments)
router.get('/:id', authenticateToken, controller.getAppointmentById)

router.post('/search', authenticateToken, controller.searchAppointment)
router.post('/create', authenticateToken, controller.createAppointment)

router.delete('/:id', authenticateToken, controller.deleteAppointmentById)

module.exports = router
