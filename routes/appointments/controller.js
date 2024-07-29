const queries = require('./queries')

// Method to GET all appointments from DB
const getAppointments = async (req, res) => {
  const pool = req.app.get('pool')
  try {
    const client = await pool.connect()
    const result = await client.query(queries.getAppointments)
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Method to one appointment by id from DB
const getAppointmentById = async (req, res) => {
  const pool = req.app.get('pool')
  const id = parseInt(req.params.id)
  try {
    const client = await pool.connect()
    const results = await client.query(queries.getAppointmentById, [id])
    if (!results.rows.length) {
      return res.status(404).json({ message: 'ID appointment not found.'} )
    }
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

// Method to set a new appointment by user
const createAppointment = async (req, res) => {
  const pool = req.app.get('pool')
  const client = await pool.connect()
  try {
    const { availability, patient, hospital, doctor } = req.body
    await client.query('BEGIN;')

    // Check if patient, hospital and doctor exists
    const [patientResult, hospitalResult, doctorResult] = await Promise.all([
      client.query(queries.checkPatientExists, [patient]),
      client.query(queries.checkHospitalExists, [hospital]),
      client.query(queries.checkDoctorExists, [doctor])
    ])

    if (!patientResult.rows.length || !hospitalResult.rows.length || !doctorResult.rows.length) {
      await client.query('ROLLBACK;')
      return res.status(404).json({ message: 'Patient, hospital or doctor not found.' })
    }

    // Check doctor availability
    const availabilityResult  = await client.query(queries.checkDoctorAvailability, [doctor, availability])
    if (!availabilityResult .rows.length) {
      await client.query('ROLLBACK;')
      return res.status(404).json({ message: 'Doctor is not available at requested date.' })
    }
    const availabilityId = availabilityResult.rows[0].id

    // Add appointment to table in database
    await client.query(queries.createAppointment, [availabilityId, patient, hospital, doctor])
    // Update availability
    await client.query(queries.updateAvailability, [doctor, availability])

    await client.query('COMMIT;')
    client.release()
    res.status(201).json({ 
      "message": `Appointment created succesfully for ${patient}`, 
      "date": `${availability}`,
      "hospital": `${hospital}`,
      "doctor": `${doctor}`
    })
  } catch (err) {
    await client.query('ROLLBACK')
    client.release()
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment
}
