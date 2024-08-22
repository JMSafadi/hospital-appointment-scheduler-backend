const queries = require('./queries')

// Method to GET all doctors from DB
const getDoctors = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  let client
  try {
    client = await pool.connect()
    const results = await client.query(queries.getDoctors)
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  } finally {
    if (client) client.release()
  }
}

// Method to GET one doctor by id from DB
const getDoctorById = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  const id = parseInt(req.params.id)
  let client
  try {
    client = await pool.connect()
    const results = await client.query(queries.getDoctorById, [id])
    if (!results.rows.length) {
      return res.status(404).json({ message: 'ID doctor not found.'} )
    }
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  } finally {
    client.release()
  }
}

module.exports = {
  getDoctors,
  getDoctorById
}
