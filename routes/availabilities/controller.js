const queries = require('./queries')

// Method to GET all availabilities from DB
const getAvailabilities = async (req, res) => {
  try {
    const pool = req.app.get('pool')
    const client = await pool.connect()
    const results = await client.query(queries.getAppointments)
    client.release()
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

// Method to GET one appointment by id from DB
const getAvailabilityById = async (req, res) => {
  const pool = req.app.get('pool')
  const id = parseInt(req.params.id)
  try {
    const client = await pool.connect()
    const results = await client.query(queries.getAppointmentById, [id])
    client.release()
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

module.exports = {
  getAvailabilities,
  getAvailabilityById
}
