const getHospitals = 'SELECT * FROM Hospitals'
const getHospitalById = 'SELECT * FROM Hospitals WHERE id = $1'

module.exports = {
  getHospitals,
  getHospitalById
}
