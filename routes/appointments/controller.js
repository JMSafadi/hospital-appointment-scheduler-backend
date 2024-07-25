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
    const result = await client.query(queries.getAppointmentById, [id])
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}

// Method to set a new appointment by user
const createAppointment = async () => {
  const pool = req.app.get('pool')
  try {
    const client = await pool.connect()
    const { availability, patient_id, hospital_id, doctor_id } = req.body
    await client.query('BEGIN;')

    // Check if patient, hospital and doctor exists
    const [patientResult, hospitalResult, doctorResult] = await Promise.all([
      client.query(queries.checkPatientExists, [patient_id]),
      client.query(queries.checkHospitalExists, [hospital_id]),
      client.query(queries.checkDoctorExists, [doctor_id])
    ])

    if (!patientResult.rows.length || !hospitalResult.rows.length || !doctorResult.rows.length) {
      await client.query('ROLLBACK;')
      return res.status(404).json({ message: 'Patient, hospital or doctor not found.' })
    }

    // Check doctor availability
    const appointment_date = await client.query(queries.checkDoctorAvailability, [doctor_id, availability])
    if (!appointment_date.rows.length) {
      await client.query('ROLLBACK;')
      return res.status(404).json({ message: 'Doctor is not available at requested date.' })
    }

    // Add appointment to table in database
    await client.query(queries.createAppointment, [availability, patient_id, hospital_id, doctor_id])
    // Delete availability
    await client.query(queries.deleteDoctorAvailability, [doctor_id, availability])

    await client.query('COMMIT;')
    client.release()
    res.status(201).json({ message: 'Appointment created successfully.' })
    // res.status(201).json({ 
    //   message: 'Appointment created succesfully for ${}', 
    //   date: `${availability}`,
    //   hospital: `${hospitalResult.}`,
    //   doctor: `${doctorResult}`
    // })
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
