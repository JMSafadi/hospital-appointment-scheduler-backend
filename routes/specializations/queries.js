const getSpecializations = 'SELECT * FROM Specializations'
const getSpecializationById = 'SELECT * FROM Specializations WHERE id = $1'

module.exports = {
  getSpecializations,
  getSpecializationById
}
