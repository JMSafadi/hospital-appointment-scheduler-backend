const queries = require('./queries')

// Method to GET all specializations from DB
const getSpecializations = async (req, res) => {
  const pool = req.app.get('pool')
  try {
    const client = await pool.connect()
    const results = await client.query(queries.getSpecializations)
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Method to GET one specialization by id from DB
const getSpecializationById = async (req, res) => {
  const pool = req.app.get('pool')
  const id = parseInt(req.params.id)
  try {
    const client = await pool.connect()
    const results = await client.query(queries.getSpecializationById, [id])
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

module.exports = {
  getSpecializations,
  getSpecializationById
}
