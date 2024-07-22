// Create DB and tables.
const initializeDBQuery = `
CREATE TABLE IF NOT EXISTS Hospitals (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Specializations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  symptoms TEXT[] NOT NULL
);

CREATE TABLE IF NOT EXISTS Doctors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  specialization_id INTEGER NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  availability JSONB NOT NULL,
  hospital_id INTEGER NOT NULL,
  CONSTRAINT fk_doctors_specializations FOREIGN KEY (specialization_id) REFERENCES Specializations(id),
  CONSTRAINT fk_doctors_hospitals FOREIGN KEY (hospital_id) REFERENCES Hospitals(id)
);

CREATE TABLE IF NOT EXISTS Patients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Appointments (
  id SERIAL PRIMARY KEY,
  appointment_date TIMESTAMP NOT NULL,
  patient_id INTEGER NOT NULL,
  hospital_id INTEGER NOT NULL,
  doctor_id INTEGER NOT NULL,
  CONSTRAINT fk_appointments_patients FOREIGN KEY (patient_id) REFERENCES Patients(id),
  CONSTRAINT fk_appointments_hospitals FOREIGN KEY (hospital_id) REFERENCES Hospitals(id),
  CONSTRAINT fk_appointments_doctors FOREIGN KEY (doctor_id) REFERENCES Doctors(id)
);

INSERT INTO Hospitals (name, location) 
VALUES 
('Evergreen Health Hospital', '14570 Alanna Mountains, New Erickaton, ND 66081'),
('Harmony Medical Clinic', 'Suite 142 7891 Breitenberg View, Isaiaston, SC 02475-3700'),
('Hopewell Medical Center', '3253 Rafael Throughway, Delsieberg, WI 56782-7248')
ON CONFLICT DO NOTHING;

INSERT INTO Specializations (name, symptoms)
VALUES
('Cardiology', '{"Chest pain", "Shortness of breath"}'),
('Neurology', '{"Loss of coordination", "Severe headaches"}'),
('Pediatrics', '{"Fever", "Persistent cough"}')
ON CONFLICT DO NOTHING;

INSERT INTO Doctors (
  name,
  specialization_id,
  start_time,
  end_time,
  availability,
  hospital_id
) VALUES 
('Dr. Braden Ashley', 1, '8:00:00', '17:00:00', '{
    "monday": {
      "availability_time": [
        "10:00:00",
        "12:00:00",
        "14:00:00"
      ]
    },
    "wednesday": {
      "availability_time": [
        "10:00:00",
        "12:00:00",
        "14:00:00"
      ]
    },
    "friday": {
      "availability_time": [
        "10:00:00",
        "12:00:00",
        "14:00:00"
      ]
    }
  }', 2),

('Dra. Isabella Flores', 2, '10:00:00', '16:00:00', '{
    "monday": {
      "availability_time": [
        "10:00:00",
        "12:00:00",
        "14:00:00"
      ]
    },
    "wednesday": {
      "availability_time": [
        "10:00:00",
        "12:00:00",
        "14:00:00"
      ]
    },
    "friday": {
      "availability_time": [
        "10:00:00",
        "12:00:00",
        "14:00:00"
      ]
    }
  }', 3),

('Dra. Evelyn Rodriguez', 1, '8:30:00', '15:30:00', '{
    "tuesday": {
      "availability_time": [
        "08:30:00",
        "10:30:00",
        "13:30:00"
      ]
    },
    "thursday": {
      "availability_time": [
        "08:30:00",
        "10:30:00",
        "13:30:00"
      ]
    }
  }', 1),

('Dra. David Miller', 3, '9:00:00', '17:00:00', '{
    "monday": {
      "availability_time": [
        "09:00:00",
        "11:00:00",
        "14:00:00",
        "16:00:00"
      ]
    },
    "tuesday": {
      "availability_time": [
        "09:00:00",
        "11:00:00",
        "14:00:00",
        "16:00:00"
      ]
    },
    "wednesday": {
      "availability_time": [
        "09:00:00",
        "11:00:00",
        "14:00:00",
        "16:00:00"
      ]
    },
    "thursday": {
      "availability_time": [
        "09:00:00",
        "11:00:00",
        "14:00:00",
        "16:00:00"
      ]
    },
    "friday": {
      "availability_time": [
        "09:00:00",
        "11:00:00",
        "14:00:00",
        "16:00:00"
      ]
    }
  }', 2),

('Dra. Olivia Garcia', 2, '10:30:00', '18:00:00', '{
    "tuesday": {
      "availability_time": [
        "10:30:00",
        "13:30:00",
        "16:30:00"
      ]
    },
    "wednesday": {
      "availability_time": [
        "10:30:00",
        "13:30:00",
        "16:30:00"
      ]
    },
    "thursday": {
      "availability_time": [
        "10:30:00",
        "13:30:00",
        "16:30:00"
      ]
    }
  }', 3),

('Dr. Michael Davis', 3, '08:00:00', '15:00:00', '{
    "tuesday": {
      "availability_time": [
        "08:00:00",
        "11:00:00",
        "14:00:00"
      ]
    },
    "wednesday": {
      "availability_time": [
        "08:00:00",
        "11:00:00",
        "14:00:00"
      ]
    },
    "friday": {
      "availability_time": [
        "08:00:00",
        "11:00:00",
        "14:00:00"
      ]
    }
  }', 2),

('Dra. Sophia Hernandez', 1, '11:00:00', '19:00:00', '{
    "monday": {
      "availability_time": [
        "11:00:00",
        "13:00:00",
        "15:00:00",
        "17:00:00"
      ]
    },
    "tuesday": {
      "availability_time": [
        "11:00:00",
        "13:00:00",
        "15:00:00",
        "17:00:00"
      ]
    },
    "wednesday": {
      "availability_time": [
        "11:00:00",
        "13:00:00",
        "15:00:00",
        "17:00:00"
      ]
    },
    "thursday": {
      "availability_time": [
        "11:00:00",
        "13:00:00",
        "15:00:00",
        "17:00:00"
      ]
    },
    "friday": {
      "availability_time": [
        "11:00:00",
        "13:00:00",
        "15:00:00",
        "17:00:00"
      ]
    }
  }', 2);
`
module.exports = { initializeDBQuery }
