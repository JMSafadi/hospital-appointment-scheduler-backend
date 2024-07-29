const express = require('express')
const controller = require('./controller')
const { authenticateToken } = require('../../middlewares/authenticateToken')

const router = express.Router()

// HTTP Requests
router.get('/', authenticateToken, (req, res) => {
  res.status(200).json({ "message": "Already signed in." })
})
router.post('/', controller.addPatient)

module.exports = router
