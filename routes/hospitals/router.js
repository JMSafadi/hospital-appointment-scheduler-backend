const express = require('express')
const controller = require('./controller')

const router = express.Router()

// HTTP Requests
router.get('/', controller.getHospitals)
router.get('/:id', controller.getHospitalById)

module.exports = router
