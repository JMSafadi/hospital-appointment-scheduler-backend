const express = require('express')
const controller = require('./controller')
const { authenticateToken } = require('../../middlewares/authenticateToken')

const router = express.Router()

// HTTP requests
router.get('/', authenticateToken, controller.getSpecializations)
router.get('/:id', authenticateToken, controller.getSpecializationById)

module.exports = router
