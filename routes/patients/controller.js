const queries = require('./queries')

// Method to GET all patients from DB
const getPatients = async (req, res) => {
  const pool = req.app.get('pool')
  try {
    const client = await pool.connect()
    const result = await client.query(queries.getPatients)
    client.release()
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

// Method to GET one patient by id from DB
const getPatientById = async (req, res) => {
  const pool = req.app.get('pool')
  const id = parseInt(req.params.id)
  try {
    const client = await pool.connect()
    const result = await client.query(queries.getPatientById, [id])
    if (!result.rows.length) {
      return res.status(404).json({ message: 'ID not found.'} )
    }
    client.release()
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

const deletePatient = async (req, res) => {
  const pool = req.app.get('pool')
  const id = parseInt(req.params.id)
  try {
    const client = await pool.connect()
    const result = await client.query(queries.getPatientById, [id])
    if (!result.rows.length) {
      return res.status(404).json({ message: 'Patient not exists. Can\'t be removed'} )
    }
    await client.query(queries.deletePatient, [id])
    client.release()
    res.status(200).json({ message: 'Patient deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

module.exports = {
  getPatients,
  getPatientById,
  deletePatient
}