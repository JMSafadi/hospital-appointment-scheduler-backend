const checkEmailExists = 'SELECT p FROM Patients p WHERE p.email = $1'
const addPatient = 'INSERT INTO Patients (name, email, password) VALUES ($1, $2, $3)'

module.exports = {
  checkEmailExists,
  addPatient,
}
