const queries = require('./queries')

// Method to GET all hospitals from DB
const getHospitals = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  let client
  try {
    client = await pool.connect()
    const results = await client.query(queries.getHospitals)
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  } finally {
    if (client) client.release()
  }
}

// Method to GET one hospital by id from DB
const getHospitalById = async (req, res) => {
  const id = parseInt(req.params.id)
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  let client
  try {
    client = await pool.connect()
    const results = await client.query(queries.getHospitalById, [id])
    if (!results.rows.length) {
      return res.status(404).json({ message: 'ID hospital not found.'} )
    }
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  } finally {
    if (client) client.release()
  }
}

module.exports = {
  getHospitals,
  getHospitalById
}
