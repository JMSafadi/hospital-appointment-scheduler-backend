const checkEmailExists = 'SELECT * FROM Patients  WHERE email = $1'

module.exports = {
  checkEmailExists,
}
