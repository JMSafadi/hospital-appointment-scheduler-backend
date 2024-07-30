const getAvailabilities = `
SELECT
  availabilities.id,
  doctors.name AS doctor,
  to_char(availabilities.availability_time, 'YYYY-MM-DD HH24:MI:SS') AS availability_time,
  availabilities.is_available
FROM Availabilities
JOIN Doctors ON availabilities.doctor_id = doctors.id;
`
const getAvailabilityById = `
SELECT
  availabilities.id,
  doctors.name AS doctor,
  to_char(availabilities.availability_time, 'YYYY-MM-DD HH24:MI:SS') AS availability_time,
  availabilities.is_available
FROM Availabilities 
JOIN Doctors ON availabilities.doctor_id = doctors.id
WHERE id = $1;
`

module.exports = {
  getAvailabilities,
  getAvailabilityById
}
