const pool = require('../../db/database')
const queries = require('./queries')

// Method to GET all patients from DB
const getPatients = async (req, res) => {
  try {
    const result = await pool.query(queries.getPatientsQuery)
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Method to GET one patient by id from DB
const getPatientsById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await pool.query(queries.getPatientsByIdQuery, [id])
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Method to POST new patient
const addPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body
    // Check if patient already exists
    const results = await pool.query(queries.checkEmailExists, [email])
    if (results.rows.length) {
      return res.status(400).send({ message: 'Email already exists.' })
    }
    // Add patient if not exists
    await pool.query(queries.addPatientQuery, [name, email, password])
    res.status(201).send({ message: 'Patient added successfully.' })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

const deletePatient = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query(queries.getPatientsQuery, [id])
    if (!results.rows.length) {
      return res.status(404).json({ message: 'Patient not exists. Can\'t be removed'} )
    }
    await pool.query(queries.deletePatientQuery, [id])
    res.status(200).json({ message: 'Patient deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  getPatients,
  getPatientsById,
  addPatient,
  deletePatient
}