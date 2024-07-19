const express = require('express')
const controller = require('./controller')

const router = express.Router()

// HTTP requests
router.get('/', controller.getDoctors)
router.get('/:id', controller.getDoctorById)

module.exports = router
