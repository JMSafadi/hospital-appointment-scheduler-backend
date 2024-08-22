const queries = require('./queries')

// Method to GET all specializations from DB
const getSpecializations = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  let client
  try {
    client  = await pool.connect()
    const results = await client.query(queries.getSpecializations)
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  } finally {
    if (client) client.release()
  }
}

// Method to GET one specialization by id from DB
const getSpecializationById = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  const id = parseInt(req.params.id)
  let client
  try {
    client = await pool.connect()
    const results = await client.query(queries.getSpecializationById, [id])
    if (!results.rows.length) {
      return res.status(404).json({ message: 'ID specialization not found.'} )
    }
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  } finally {
    if (client) client.release()
  }
}

module.exports = {
  getSpecializations,
  getSpecializationById
}
