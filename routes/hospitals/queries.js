const getHospitals = 'SELECT * FROM Hospitals'
const getHospitalsById = 'SELECT * FROM Hospitals WHERE id = $1'

module.exports = {
  getHospitals,
  getHospitalsById
}