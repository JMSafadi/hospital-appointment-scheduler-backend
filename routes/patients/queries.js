const getPatients = 'SELECT * FROM Patients'
const getPatientById = 'SELECT * FROM Patients WHERE id = $1'

const checkEmailExists = 'SELECT p FROM Patients p WHERE p.email = $1'
const addPatient = 'INSERT INTO Patients (name, email, password) VALUES ($1, $2, $3)'

const deletePatient = 'DELETE FROM Patients WHERE id = $1'

module.exports = {
  getPatients,
  getPatientById,
  checkEmailExists,
  addPatient,
  deletePatient
}
