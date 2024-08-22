const queries = require('./queries')
const jwt = require('../../lib/jwt')

// Method to GET all appointments from DB
const getAppointments = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  let client
  try {
    client = await pool.connect()
    const results = await client.query(queries.getAppointments)
    if (!results.rows.length) {
      return res.status(404).json({ message: 'There are no appointments scheduled yet.' })
    }
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  } finally {
    if (client) client.release()
  }
}

// Method to get one appointment by id from DB
const getAppointmentById = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  const id = parseInt(req.params.id)
  let client
  try {
    client = await pool.connect()
    const results = await client.query(queries.getAppointmentById, [id])
    if (!results.rows.length) {
      return res.status(404).json({ message: 'ID appointment not found.'} )
    }
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  } finally {
    if (client) client.release()
  }
}

// Method to search for availabilities in order by date
const searchAppointment = async (req, res) => {
  const { symptoms, specialization } = req.body
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  const token = req.header('x-auth-token')
  let patient
  let client = await pool.connect()

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    patient = decoded.name
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized: Invalid Token' })
  }

  try {
    await client.query('BEGIN;')
    let doctorResult
    if (specialization) {
      doctorResult = await client.query(queries.getDoctorBySpecialization, [specialization])
    } else if (symptoms) {
      doctorResult = await client.query(queries.getDoctorBySymptom, [symptoms])
    }
    if (!doctorResult || !doctorResult.rows.length) {
      await client.query('ROLLBACK;')
      return  res.status(404).json({ message: 'No doctor found for the required specialization.' })
    }

    const doctorIds = doctorResult.rows.map(row => row.id)

    const availabilitiesResults = await client.query(queries.getNearestAvailabilities, [doctorIds])
    if (!availabilitiesResults.rows.length) {
      await client.query('ROLLBACK;')
      return res.status(404).json({ message: 'No available appointments found.' })
    }
    await client.query('COMMIT;')
    res.status(200).json({ availabilities: availabilitiesResults.rows })
  } catch (err) {
    await client.query('ROLLBACK;')
    res.status(500).json({ error: 'Internal server error', message: err.message })
  } finally {
    if (client) client.release()
  }
}

// Method to set a new appointment by user with availability ID.
const createAppointment = async (req, res) => {
  // Get availability ID
  const { availabilityId } = req.body
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  // Extract patient name with JWT
  const token = req.header('x-auth-token')
  let client  = await pool.connect()
  let patient

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    patient = decoded.name
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized: Invalid Token' })
  }

  try {
    await client.query('BEGIN;')
    // Check if patient, hospital and doctor exists
    const patientResult = await client.query(queries.checkPatientExists, [patient])
    if (!patientResult.rows.length) {
      await client.query('ROLLBACK;')
      return res.status(404).json({ message: 'Patient not found.' })
    }
    const patientId = patientResult.rows[0].id

    // Get availability details
    const availabilityResult = await client.query(queries.getAvailabilityById, [availabilityId])
    if (!availabilityResult.rows.length) {
      await client.query('ROLLBACK;')
      return res.status(404).json({ message: 'Availability not found.' })
    }
    const availability = availabilityResult.rows[0]

    // Add appointment to table in database
    await client.query(queries.createAppointment, [availability.id, patientId, availability.hospital_id, availability.doctor_id])
    // Update patient load in doctor
    await client.query(queries.addPatientLoad, [availability.doctor_id])
    // Update availability
    await client.query(queries.updateAvailability, [availability.id])

    await client.query('COMMIT;')
    res.status(201).json({ 
      message: `Appointment created succesfully for patient ${patient}`, 
      date: availability.availability_time,
      hospital: availability.hospital_name,
      doctor: availability.doctor_name
    })
  } catch (err) {
    await client.query('ROLLBACK')
    res.status(500).json({ error: 'Internal server error', message: err.message })
  } finally {
    if (client) client.release()
  }
}

const deleteAppointmentById = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  const id = parseInt(req.params.id)
  let client
  try {
    client = await pool.connect()
    await client.query('BEGIN;')
    // Check if appointment exists
    const results = await client.query(queries.getAppointmentById, [id])
    if (!results.rows.length) {
      await client.query('ROLLBACK;')
      return res.status(404).json({ message: 'ID appointment not found.'} )
    }
    const doctor = results.rows[0].doctor

    // Get availability
    const availabilityId = results.rows[0].availability_id
    // Delete appointment
    await client.query(queries.deleteAppointmentById, [id])
    // Update patient load in doctor
    await client.query(queries.subtractPatientLoad, [doctor])
    // Update availability
    await client.query('UPDATE Availabilities SET is_available = TRUE WHERE ID = $1;', [availabilityId])

    await client.query('COMMIT;')
    res.status(200).json({ message: "The appointment has been deleted successfully." })
  } catch (err) {
    await client.query('ROLLBACK;')
    res.status(500).json({ error: "Internal server error", message: err.message })
  } finally {
    if (client) client.release()
  }
}

module.exports = {
  getAppointments,
  getAppointmentById,
  searchAppointment,
  createAppointment,
  deleteAppointmentById
}
