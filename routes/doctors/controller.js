const pool = require('../../db/database')
const queries = require('./queries')

// Method to GET all doctors from DB
const getDoctors = async (req, res) => {
  try {
    const results = await pool.query(queries.getDoctorsQuery)
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Method to GET one doctor by id from DB
const getDoctorById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const results = await pool.query(queries.getDoctorByIdQuery, [id])
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  getDoctors,
  getDoctorById
}
