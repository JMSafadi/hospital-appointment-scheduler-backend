const initializeDBQuery = `
CREATE TABLE IF NOT EXISTS Hospitals (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  location TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Specializations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  symptoms TEXT[] NOT NULL
);

CREATE TABLE IF NOT EXISTS Doctors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  specialization_id INTEGER NOT NULL,
  hospital_id INTEGER NOT NULL,
  patient_load INTEGER DEFAULT 0,
  CONSTRAINT fk_doctors_specializations FOREIGN KEY (specialization_id) REFERENCES Specializations(id),
  CONSTRAINT fk_doctors_hospitals FOREIGN KEY (hospital_id) REFERENCES Hospitals(id),
  CONSTRAINT unique_doctor UNIQUE (name, specialization_id, hospital_id)
);

CREATE TABLE IF NOT EXISTS Availabilities (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER NOT NULL,
  availability_time TIMESTAMP NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  CONSTRAINT fk_availabilities_doctors FOREIGN KEY (doctor_id) REFERENCES Doctors(id),
  CONSTRAINT unique_doctor_availability UNIQUE (doctor_id, availability_time)
);

CREATE TABLE IF NOT EXISTS Patients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Appointments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL,
  availability_id INTEGER NOT NULL,
  hospital_id INTEGER NULL,
  doctor_id INTEGER NOT NULL,
  CONSTRAINT fk_appointments_patients FOREIGN KEY (patient_id) REFERENCES Patients(id),
  CONSTRAINT fk_appointments_hospitals FOREIGN KEY (hospital_id) REFERENCES Hospitals(id),
  CONSTRAINT fk_appointments_doctors FOREIGN KEY (doctor_id) REFERENCES Doctors(id),
  CONSTRAINT fk_appointments_availabilities FOREIGN KEY (availability_id) REFERENCES Availabilities(id)
);

INSERT INTO Hospitals (name, location) 
VALUES 
('Evergreen Health Hospital', '14570 Alanna Mountains, New Erickaton, ND 66081'),
('Harmony Medical Clinic', 'Suite 142 7891 Breitenberg View, Isaiaston, SC 02475-3700'),
('Hopewell Medical Center', '3253 Rafael Throughway, Delsieberg, WI 56782-7248')
ON CONFLICT (name) DO NOTHING;

INSERT INTO Specializations (name, symptoms)
VALUES
('Gastroenterology', '{"Abdominal pain", "Nausea", "Diarrhea"}'),
('Orthopedics', '{"Joint pain", "Back pain", "Swelling"}'),
('Dermatology', '{"Skin rash", "Itching", "Acne"}'),
('Cardiology', '{"Chest pain", "Shortness of breath"}'),
('Neurology', '{"Loss of coordination", "Severe headaches"}'),
('Pediatrics', '{"Fever", "Persistent cough"}'),
('Endocrinology', '{"Fatigue", "Weight gain", "Hair loss"}'),
('Ophthalmology', '{"Blurry vision", "Eye pain", "Redness"}'),
('Urology', '{"Frequent urination", "Blood in urine", "Pelvic pain"}'),
('Rheumatology', '{"Joint stiffness", "Muscle pain", "Swollen joints"}')
ON CONFLICT (name) DO NOTHING;

INSERT INTO Doctors (
  name,
  specialization_id,
  hospital_id
)
VALUES 
('Dr. Braden Ashley', 1, 2),
('Dra. Isabella Flores', 4, 3),
('Dra. Evelyn Rodriguez', 4, 3),
('Dra. David Miller', 3, 1),
('Dra. Olivia Garcia', 2, 3),
('Dr. Michael Davis', 5, 2),
('Dra. Sophia Hernandez', 7, 1),
('Dr. Amelia Johnson', 9, 1),
('Dr. Noah Smith', 6, 2),
('Dr. Ava Brown', 3, 3),
('Dr. Liam Williams', 4, 1),
('Dra. Mia Jones', 5, 2),
('Dr. Oliver Garcia', 6, 3),
('Dra. Sophia Martinez', 7, 1),
('Dr. Ethan Davis', 8, 2),
('Dr. Isabella Wilson', 9, 3),
('Dr. Elijah Anderson', 10, 1)
ON CONFLICT (name, specialization_id, hospital_id) DO NOTHING;

INSERT INTO Availabilities (
  doctor_id, 
  availability_time
)
VALUES
(1, '2024-10-05 10:00:00'),
(1, '2024-12-10 12:00:00'),
(2, '2024-10-12 18:40:00'),
(3, '2024-11-15 11:30:00'),
(3, '2024-10-24 10:00:00'),
(4, '2024-11-14 09:00:00'),
(5, '2024-12-01 15:30:00'),
(6, '2024-11-13 17:10:00'),
(7, '2024-10-20 20:15:00'),
(8, '2024-12-9 15:30:00'),
(8, '2024-11-15 13:30:00'),
(9, '2024-1-19 09:00:00'),
(10, '2024-10-9 09:00:00'),
(10, '2024-12-1 13:00:00'),
(11, '2024-11-15 09:00:00'),
(12, '2024-10-13 11:30:00'),
(13, '2024-12-14 16:00:00'),
(13, '2024-12-22 13:30:00'),
(14, '2024-11-20 19:00:00'),
(15, '2024-10-18 19:00:00'),
(16, '2024-10-9 08:45:00'),
(17, '2024-12-2 10:00:00'),
(17, '2024-11-28 11:15:00')
ON CONFLICT (doctor_id, availability_time) DO NOTHING;
`

module.exports = { initializeDBQuery }
