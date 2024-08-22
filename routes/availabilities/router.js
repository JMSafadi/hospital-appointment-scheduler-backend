const express = require('express')
const controller = require('./controller')
const { authenticateToken } = require("../../middlewares/authenticateToken")

const router = express.Router()

// HTTP requests
router.get('/', authenticateToken, controller.getAvailabilities)
router.get('/:id', authenticateToken, controller.getAvailabilityById)

module.exports = router
