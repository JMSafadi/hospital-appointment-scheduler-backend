const checkEmailExists = 'SELECT p FROM Patients p WHERE p.email = $1'

module.exports = {
  checkEmailExists,
}
