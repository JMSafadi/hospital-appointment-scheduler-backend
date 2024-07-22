const getDoctors = 'SELECT * FROM Doctors'
const getDoctorById = 'SELECT * FROM Doctors WHERE id = $1'

module.exports = {
  getDoctors,
  getDoctorById
}