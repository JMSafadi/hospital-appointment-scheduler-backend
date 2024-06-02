const express = require('express')
const router = express.Router()

const { Patient } = require('../models')

// Create patient
router.post('/', async (req, res) => {
  try {
    const patient = await Patient.create(req.body)
    res.json(patient)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get patients
router.get('/', async (req, res) => {
  // try {
  //   const patients = await Patient.findAll()
  //   res.json(patients)
  // } catch (error) {
  //   res.status(500).json({ error: error.message })
  // }
  res.json('Patients route')
})

module.exports = router
