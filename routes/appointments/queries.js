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
SELECT 
  d.id, 
  d.name
FROM Doctors d
JOIN Specializations s ON d.specialization_id = s.id
WHERE s.name = $1
ORDER BY d.patient_load ASC;
`

const getDoctorBySymptom = `
SELECT 
  d.id,
  d.name
FROM Doctors d
JOIN Specializations s ON d.specialization_id  = s.id
WHERE $1 && s.symptoms;
`

const getNearestAvailabilities = `
SELECT
  a.id,
  to_char(a.availability_time, 'YYYY-MM-DD HH24:MI:SS') AS availability,
  d.name as doctor,
  h.name as hospital,
  s.name as specialization
FROM Availabilities a
JOIN Doctors d ON a.doctor_id = d.id
JOIN Hospitals h ON d.hospital_id = h.id
JOIN Specializations s ON d.specialization_id = s.id
WHERE a.doctor_id = ANY($1) AND a.is_available = TRUE
ORDER BY a.availability_time ASC;
`

const getAvailabilityById = `
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
WHERE a.id = $1 AND a.is_available = TRUE;
`

const createAppointment = `
INSERT INTO Appointments (availability_id, patient_id, hospital_id, doctor_id) 
VALUES ($1, $2, $3, $4);`

const addPatientLoad = `
UPDATE Doctors
SET patient_load = patient_load + 1
WHERE id = $1;
`

const subtractPatientLoad = `
UPDATE Doctors
SET patient_load = patient_load - 1
WHERE name = $1;
`

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
  getNearestAvailabilities,
  getAvailabilityById,
  createAppointment,
  addPatientLoad,
  subtractPatientLoad,
  updateAvailability,
  deleteAppointmentById
}
