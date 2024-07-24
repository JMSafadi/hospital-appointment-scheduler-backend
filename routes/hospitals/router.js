const express = require('express')
const controller = require('./controller')
const { authenticateToken } = require('../../middleware/authenticateToken')

const router = express.Router()

// HTTP Requests
router.get('/', authenticateToken, controller.getHospitals)
router.get('/:id', authenticateToken, controller.getHospitalById)

module.exports = router
