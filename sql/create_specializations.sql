CREATE TABLE Specializations (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  doctorId INTEGER NOT NULL,
  symptoms JSON NOT NULL,
  FOREIGN KEY (doctorId) REFERENCES Doctors(id)
)

INSERT INTO Specializations (
  name,
  symptoms,
)