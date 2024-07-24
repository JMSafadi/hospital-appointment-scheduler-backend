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
    client.release()
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

// Method to POST new patient
// const addPatient = async (req, res) => {
//   const pool = req.app.get('pool')
//   try {
//     const { name, email, password } = req.body
//     // Check if patient already exists
//     const client = await pool.connect()
//     const results = await client.query(queries.checkEmailExists, [email])
//     if (results.rows.length) {
//       return res.status(400).json({ message: 'Email already exists.' })
//     }

//     // Add JWT

//     // Add patient if not exists
//     await client.query(queries.addPatient, [name, email, password])
//     client.release()
//     res.status(201).json({ message: 'Patient added successfully.' })
//   } catch (err) {
//     res.status(500).json({ error: 'Internal server error', message: err.message })
//   }
// }

const deletePatient = async (req, res) => {
  const pool = req.app.get('pool')
  const id = parseInt(req.params.id)
  try {
    const client = await pool.connect()
    const results = await client.query(queries.getPatientById, [id])
    if (!results.rows.length) {
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
  // addPatient,
  deletePatient
}