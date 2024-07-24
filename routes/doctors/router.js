const express = require('express')
const controller = require('./controller')
const { authenticateToken } = require('../../middleware/authenticateToken')

const router = express.Router()

// HTTP requests
router.get('/', authenticateToken, controller.getDoctors)
router.get('/:id', authenticateToken, controller.getDoctorById)

module.exports = router
