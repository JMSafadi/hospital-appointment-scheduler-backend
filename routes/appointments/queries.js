const getAppointments = 'SELECT * FROM Appointments;'
const getAppointmentById = 'SELECT * FROM Appointments WHERE id = $1;'

const checkPatientExists = 'SELECT 1 FROM Patients WHERE id = $1;'
const checkHospitalExists = 'SELECT 1 FROM Hospitals WHERE id = $1;'
const checkDoctorExists = 'SELECT 1 FROM Doctors WHERE id = $1;'

const checkDoctorAvailability = 'SELECT 1 FROM Availabilities WHERE doctor_id = $1 AND availability_time = $2;'

const createAppointment = 'INSERT INTO Appointments (appointment_date, patient_id, hospital_id, doctor_id) VALUES ($1, $2, $3, $4);'

const deleteDoctorAvailability = 'DELETE FROM Availabilities WHERE doctor_id = $1 AND availability_time = $2;'

module.exports = {
  getAppointments,
  getAppointmentById,
  checkPatientExists,
  checkHospitalExists,
  checkDoctorExists,
  checkDoctorAvailability,
  createAppointment,
  deleteDoctorAvailability
}
