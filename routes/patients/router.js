const express = require('express')
const controller = require('./controller')

const router = express.Router()

// HTTP Requests
router.get('/', controller.getPatients)
router.get('/:id', controller.getPatientById)
// router.post('/', controller.addPatient)
router.delete('/:id', controller.deletePatient)

module.exports = router
