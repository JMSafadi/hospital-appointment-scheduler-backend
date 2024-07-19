const express = require('express')
const controller = require('./controller')

const router = express.Router()

// HTTP requests
router.get('/', controller.getAppointments)
router.get('/:id', controller.getAppointmentsById)

router.post('/', (req, res) => {
  
})

module.exports = router