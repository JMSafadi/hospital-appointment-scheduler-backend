const getAppointments = `
SELECT
  appointments.id ,
  patients.name AS patient,
  to_char(availabilities.availability_time, 'YYYY-MM-DD HH24:MI:SS') AS date,
  hospitals.name AS hospital,
  doctors.name AS doctor
FROM Appointments
JOIN Patients ON appointments.patient_id = patients.id
JOIN Availabilities ON appointments.availability_id = availabilities.id
JOIN Hospitals ON appointments.hospital_id = hospitals.id
JOIN Doctors ON appointments.doctor_id = doctors.id;
`

const getAppointmentById = `
SELECT
  appointments.id ,
  patients.name AS patient,
  to_char(availabilities.availability_time, 'YYYY-MM-DD HH24:MI:SS') AS date,
  hospitals.name AS hospital,
  doctors.name AS doctor,
  appointments.availability_id
FROM Appointments
JOIN Patients ON appointments.patient_id = patients.id
JOIN Availabilities ON appointments.availability_id = availabilities.id
JOIN Hospitals ON appointments.hospital_id = hospitals.id
JOIN Doctors ON appointments.doctor_id = doctors.id
WHERE appointments.id = $1;
`

const checkPatientExists = 'SELECT id FROM Patients WHERE name = $1;'

const getDoctorBySpecialization = `
SELECT d.id, d.name
FROM Doctors d
JOIN Specializations s ON d.specialization_id = s.id
WHERE s.name = $1;
`

const getDoctorBySymptom = `
SELECT DISTINCT d.id, d.name
FROM Doctors d
JOIN Specializations s ON d.specialization_id  = s.id
WHERE $1 && s.symptoms;
`

const getNearestAvailability = `
SELECT
  a.id,
  to_char(a.availability_time, 'YYYY-MM-DD HH24:MI:SS') AS availability_time,
  a.doctor_id,
  d.name as doctor_name,
  d.hospital_id,
  h.name as hospital_name
FROM Availabilities a
JOIN Doctors d ON a.doctor_id = d.id
JOIN Hospitals h ON d.hospital_id = h.id
WHERE a.doctor_id = $1 AND a.is_available = TRUE
ORDER BY a.availability_time ASC
LIMIT 1;
`

const checkDoctorAvailability = `
SELECT id
FROM Availabilities 
WHERE 
  doctor_id = (SELECT id FROM Doctors WHERE name = $1)
AND 
  availability_time = $2
AND
  is_available = TRUE;
`

const createAppointment = `
INSERT INTO Appointments (availability_id, patient_id, hospital_id, doctor_id) 
VALUES (
  $1,
  $2,
  $3,
  $4
);`

const updateAvailability = `
UPDATE Availabilities 
SET is_available = FALSE 
WHERE id = $1
`

const deleteAppointmentById = 'DELETE FROM Appointments WHERE id = $1;'

module.exports = {
  getAppointments,
  getAppointmentById,
  checkPatientExists,
  getDoctorBySpecialization,
  getDoctorBySymptom,
  getNearestAvailability,
  checkDoctorAvailability,
  createAppointment,
  updateAvailability,
  deleteAppointmentById
}
