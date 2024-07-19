const getAppointmentsQuery = 'SELECT * FROM Appointments'
const getAppointmentByIdQuery = 'SELECT * FROM Appointments WHERE id = $1'

module.exports = {
  getAppointmentsQuery,
  getAppointmentByIdQuery
}