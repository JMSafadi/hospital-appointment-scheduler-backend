const getAppointments = `
SELECT
  appointments.id ,
  patients.name AS patient,
  availabilities.availability_time AS date,
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
  availabilities.availability_time AS date,
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
const checkHospitalExists = 'SELECT id FROM Hospitals WHERE name = $1;'
const checkDoctorExists = 'SELECT id FROM Doctors WHERE name = $1;'

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
  (SELECT id FROM Patients WHERE name = $2),
  (SELECT id FROM Hospitals WHERE name = $3),
  (SELECT id FROM Doctors WHERE name = $4)
);`

const updateAvailability = `
UPDATE Availabilities 
SET is_available = FALSE 
WHERE 
  doctor_id = (SELECT id FROM Doctors WHERE name = $1) 
AND availability_time = $2;
`

const deleteAppointmentById = 'DELETE FROM Appointments WHERE id = $1;'

module.exports = {
  getAppointments,
  getAppointmentById,
  checkPatientExists,
  checkHospitalExists,
  checkDoctorExists,
  checkDoctorAvailability,
  createAppointment,
  updateAvailability,
  deleteAppointmentById
}
