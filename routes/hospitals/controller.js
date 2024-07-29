const queries = require('./queries')

// Method to GET all hospitals from DB
const getHospitals = async (req, res) => {
  const pool = req.app.get('pool')
  try {
    const client = await pool.connect()
    const results = await client.query(queries.getHospitals)
    client.release()
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

// Method to GET one hospital by id from DB
const getHospitalById = async (req, res) => {
  const pool = req.app.get('pool')
  const id = parseInt(req.params.id)
  try {
    const client = await pool.connect()
    const results = await client.query(queries.getHospitalById, [id])
    if (!results.rows.length) {
      return res.status(404).json({ message: 'ID hospital not found.'} )
    }
    client.release()
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

module.exports = {
  getHospitals,
  getHospitalById
}
