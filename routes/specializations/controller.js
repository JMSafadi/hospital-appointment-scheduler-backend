const pool = require('../../db/database')
const queries = require('./queries')

// Method to GET all specializations from DB
const getSpecializations = async (req, res) => {
  try {
    const results = await pool.query(queries.getSpecializationsQuery)
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Method to GET one specialization by id from DB
const getSpecializationById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const results = await pool.query(queries.getSpecializationByIdQuery, [id])
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  getSpecializations,
  getSpecializationById
}
