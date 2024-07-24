const express = require('express')
const controller = require('./controller')
const { authenticateToken } = require('../../middleware/authenticateToken')

const router = express.Router()

// HTTP Requests
router.get('/', authenticateToken, controller.getPatients)
router.get('/:id', authenticateToken, controller.getPatientById)
router.delete('/:id', authenticateToken, controller.deletePatient)

module.exports = router
