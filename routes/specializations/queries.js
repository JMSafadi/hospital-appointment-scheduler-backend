const getSpecializationsQuery = 'SELECT * FROM Specializations'
const getSpecializationByIdQuery = 'SELECT * FROM Specializations WHERE id = $1'

module.exports = {
  getSpecializationsQuery,
  getSpecializationByIdQuery
}