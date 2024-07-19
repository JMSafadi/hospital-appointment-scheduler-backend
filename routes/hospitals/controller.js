const pool = require('../../db/database')
const queries = require('./queries')

// Method to GET all hospitals from DB
const getHospitals = async (req, res) => {
  try {
    const results = await pool.query(queries.getHospitalsQuery)
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Method to GET one hospital by id from DB
const getHospitalsById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const results = await pool.query(queries.getHospitalsQuery, [id])
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  getHospitals,
  getHospitalsById
}
