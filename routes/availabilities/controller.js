const queries = require('./queries')

// Method to GET all availabilities from DB
const getAvailabilities = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  let client
  try {
    client = await pool.connect()
    const results = await client.query(queries.getAvailabilities)
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  } finally {
    client.release()
  }
}

// Method to GET one appointment by id from DB
const getAvailabilityById = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  const id = parseInt(req.params.id)
  let client
  try {
    client = await pool.connect()
    const results = await client.query(queries.getAvailabilityById, [id])
    if (!results.rows.length) {
      return res.status(404).json({ message: 'ID availability not found.'} )
    }
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  } finally {
    if (client) client.release()
  }
}

module.exports = {
  getAvailabilities,
  getAvailabilityById
}
