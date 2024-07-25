const express = require('express')
const controller = require('./controller')
const { authenticateToken } = require('../../middlewares/authenticateToken')

const router = express.Router()

// HTTP requests
router.get('/', authenticateToken, controller.getAppointments)
router.get('/:id', authenticateToken, controller.getAppointmentById)

router.post('/', authenticateToken, controller.createAppointment)

// TO DOs
// router.patch('/', authenticateToken, controller.updateAppointment)
// router.delete('/', authenticateToken, controller.deleteAppointment)


module.exports = router
