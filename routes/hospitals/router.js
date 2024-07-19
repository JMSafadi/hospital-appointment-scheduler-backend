const express = require('express')
const controller = require('./controller')

const router = express.Router()

// HTTP Requests
router.get('/', controller.getHospitals)
router.get('/:id', controller.getHospitalsById)

module.exports = router
