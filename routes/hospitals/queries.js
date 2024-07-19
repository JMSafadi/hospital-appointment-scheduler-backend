const getHospitalsQuery = 'SELECT * FROM Hospitals'
const getHospitalsByIdQuery = 'SELECT * FROM Hospitals WHERE id = $1'

module.exports = {
  getHospitalsQuery,
  getHospitalsByIdQuery
}