const getAppointments = 'SELECT * FROM Availabilities;'
const getAppointmentById = 'SELECT * FROM Availabilities WHERE id = $1,'

module.exports = {
  getAppointments,
  getAppointmentById
}