const pool = require('../../db/database')
const queries = require('./queries')

// Method to GET all appointments from DB
const getAppointments = async (req, res) => {
  try {
    const result = await pool.query(queries.getAppointmentsQuery)
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
// Method to one appointment by id from DB
const getAppointmentsById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await pool.query(queries.getAppointmentByIdQuery, [id])
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  getAppointments,
  getAppointmentsById
}