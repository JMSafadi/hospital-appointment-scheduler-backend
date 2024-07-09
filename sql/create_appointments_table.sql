CREATE TABLE Appointments (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  FOREIGN KEY (patientId) REFERENCES Patients(id),
  FOREIGN KEY (hospitalId) REFERENCES Hospitals(id),
  FOREIGN KEY (doctorId) REFERENCES Doctors(id),
  appointment_date DATETIME NOT NULL,
)