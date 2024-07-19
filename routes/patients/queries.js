const getPatientsQuery = 'SELECT * FROM Patients'
const getPatientsByIdQuery = 'SELECT * FROM Patients WHERE id = $1'

const checkEmailExists = 'SELECT p FROM Patients p WHERE p.email = $1'
const addPatientQuery = 'INSERT INTO Patients (name, email, password) VALUES ($1, $2, $3)'

const deletePatientQuery = 'DELETE FROM Patients WHERE id = $1'

module.exports = {
  getPatientsQuery,
  getPatientsByIdQuery,
  checkEmailExists,
  addPatientQuery,
  deletePatientQuery
}