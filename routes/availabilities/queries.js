const getAvailabilities = `
SELECT
  availabilities.id,
  doctors.name AS doctor,
  availabilities.availability_time,
  availabilities.is_available
FROM Availabilities
JOIN Doctors ON availabilities.doctor_id = doctors.id;
`
const getAvailabilityById = `
SELECT
  availabilities.id,
  doctors.name AS doctor,
  availabilities.availability_time,
  availabilities.is_available
FROM Availabilities 
JOIN Doctors ON availabilities.doctor_id = doctors.id
WHERE id = $1;
`

module.exports = {
  getAvailabilities,
  getAvailabilityById
}
