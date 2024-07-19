const express = require('express')
const controller = require('./controller')

const router = express.Router()

// HTTP requests
router.get('/', controller.getSpecializations)
router.get('/:id', controller.getSpecializationById)

module.exports = router
