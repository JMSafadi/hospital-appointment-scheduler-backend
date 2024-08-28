const express = require('express')
const controller = require('./controller')
const { authenticateToken } = require('../../middlewares/authenticateToken')

const router = express.Router()

// HTTP requests
router.get('/', authenticateToken, (req, res) => {
  res.status(200).json({ 'message': 'Already logged in.' })
})
router.post('/', controller.loginPatient)

module.exports = router
