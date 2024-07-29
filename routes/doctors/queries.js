const getDoctors = `
SELECT 
  doctors.id,
  doctors.name,
  specializations.name AS specialization,
  hospitals.name AS hospital
FROM Doctors
JOIN Specializations ON doctors.specialization_id = specializations.id
JOIN Hospitals ON doctors.hospital_id = hospitals.id;
`

const getDoctorById = `
SELECT 
  doctors.id,
  doctors.name,
  specializations.name AS specialization,
  hospitals.name AS hospital
FROM Doctors
JOIN Specializations ON doctors.specialization_id = specializations.id
JOIN Hospitals ON doctors.hospital_id = hospitals.id
WHERE doctors.id = $1;
`

module.exports = {
  getDoctors,
  getDoctorById
}