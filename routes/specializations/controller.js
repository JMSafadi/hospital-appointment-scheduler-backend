const queries = require('./queries')

// Method to GET all specializations from DB
const getSpecializations = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  const client = await pool.connect()
  try {
    const results = await client.query(queries.getSpecializations)
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Method to GET one specialization by id from DB
const getSpecializationById = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  const id = parseInt(req.params.id)
  const client = await pool.connect()
  try {
    const results = await client.query(queries.getSpecializationById, [id])
    if (!results.rows.length) {
      client.release()
      return res.status(404).json({ message: 'ID specialization not found.'} )
    }
    client.release()
    res.status(200).json(results.rows)
  } catch (err) {
    client.release()
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

module.exports = {
  getSpecializations,
  getSpecializationById
}
