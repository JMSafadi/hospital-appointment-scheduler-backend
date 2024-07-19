const getDoctorsQuery = 'SELECT * FROM Doctors'
const getDoctorByIdQuery = 'SELECT * FROM Doctors WHERE id = $1'

module.exports = {
  getDoctorsQuery,
  getDoctorByIdQuery
}