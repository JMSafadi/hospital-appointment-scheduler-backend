-- Create DB tables.
CREATE TABLE Doctors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  specializationId INTEGER NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  availability JSONB NOT NULL,
  hospitalId INTEGER NOT NULL
)

CREATE TABLE Hospitals (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL
)

CREATE TABLE Specializations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  symptoms TEXT[] NOT NULL
)

CREATE TABLE Appointments (
  id SERIAL PRIMARY KEY,
  appointment_date TIMESTAMP NOT NULL
)

CREATE TABLE Patients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
)


-- Set relationships
ALTER TABLE Doctors
  ADD CONSTRAINT fk_doctors_specializations FOREIGN KEY (specialization_id) REFERENCES Specializations(id)
  ADD CONSTRAINT fk_doctors_hospitals FOREIGN KEY (hospital_id) REFERENCES Hospitals(id)

ALTER TABLE Appointments
  ADD CONSTRAINT fk_appointments_patients FOREIGN KEY (patient_id) REFERENCES Patients(id)
  ADD CONSTRAINT fk_appointments_hospitals FOREIGN KEY (hospital_id) REFERENCES Hospitals(id)
  ADD CONSTRAINT fk_appointments_doctors FOREIGN KEY (doctor_id) REFERENCES Doctors(id)

ALTER TABLE Patients
  ADD CONSTRAINT fk_patients_appointments FOREING KEY (appointment_id) REFERENCES Appointments(id)


-- Insert static data
INSERT INTO Hospitals (name, location)
VALUES
('Evergreen Health Hospital', '14570 Alanna Mountains, New Erickaton, ND 66081')
('Harmony Medical Clinic', 'Suite 142 7891 Breitenberg View, Isaiaston, SC 02475-3700')
('Hopewell Medical Center', '3253 Rafael Throughway, Delsieberg, WI 56782-7248')

INSERT INTO Specializations (name, symptoms)
VALUES
('Cadiology', '{"Chest pain", "Shortness of breath"}')
('Neurology', '{"Loss of coordination", "Severe headaches"}')
('Pediatrics', '{"Fever", "Persistent cough"}')

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
        "14:00:00",
      ]
    },
    "wednesday": {
      "availability_time": [
        "10:00:00",
        "12:00:00",
        "14:00:00",
      ]
    },
    "friday": {
      "availability_time": [
        "10:00:00",
        "12:00:00",
        "14:00:00",
      ]
    },
  }',
  2
)

('Dra. Isabella Flores', 2, '10:00:00', '16:00:00', '{
    "monday": {
      "availability_time": [
        "10:00:00",
        "12:00:00",
        "14:00:00",
      ],
    },
    "wednesday": {
      "availability_time": [
        "10:00:00",
        "12:00:00",
        "14:00:00",
      ],
    },
    "friday": {
      "availability_time": [
        "10:00:00",
        "12:00:00",
        "14:00:00",
      ],
    },
  }',
  3
)
('Dra. Evelyn Rodriguez', 1, '8:30:00', '15:30:00', '{
    "tuesday": {
      "availability_time": [
        "08:30:00",
        "10:30:00",
        "13:30:00",
      ]
    },
    "thursday": {
      "availability_time": [
        "08:30:00",
        "10:30:00",
        "13:30:00",
      ]
    }
  }',
  1
)

('Dra. David Miller', 3, '9:00:00', '17:00:00', '{
    "monday": {
      "availability_time": [
        "09:00:00",
        "11:00:00",
        "14:00:00",
        "16:00:00",
      ]
    },
    "tuesday": {
      "availability_time": [
        "09:00:00",
        "11:00:00",
        "14:00:00",
        "16:00:00",
      ]
    },
    "wednesday": {
      "availability_time": [
        "09:00:00",
        "11:00:00",
        "14:00:00",
        "16:00:00",
      ]
    },
    "thursday": {
      "availability_time": [
        "09:00:00",
        "11:00:00",
        "14:00:00",
        "16:00:00",
      ]
    },
    "friday": {
      "availability_time": [
        "09:00:00",
        "11:00:00",
        "14:00:00",
        "16:00:00",
      ]
    }
  }',
  2
)

('Dra. Olivia Garcia', 2, '10:30:00', '18:00:00', '{
    "tuesday": {
      "availability_time": [
        "10:30:00",
        "13:30:00",
        "16:30:00",
      ]
    },
    "wednesday": {
      "availability_time": [
        "10:30:00",
        "13:30:00",
        "16:30:00",
      ]
    },
    "thursday": {
      "availability_time": [
        "10:30:00",
        "13:30:00",
        "16:30:00",
      ]
    }
  }',
  3
)

('Dr. Michael Davis', 3, '08:00:00', '15:00:00', '{
    "tuesday": {
      "availability_time": [
        "08:00:00",
        "11:00:00",
        "14:00:00",
      ]
    },
    "wednesday": {
      "availability_time": [
        "08:00:00",
        "11:00:00",
        "14:00:00",
      ]
    },
    "friday": {
      "availability_time": [
        "08:00:00",
        "11:00:00",
        "14:00:00",
      ]
    }
  }',
  2
)

('Dra. Sophia Hernandez', 1, '11:00:00', '19:00:00', '{
    "monday": {
      "availability_time": [
        "11:00:00",
        "13:00:00",
        "15:00:00",
        "17:00:00",
      ]
    },
    "tuesday": {
      "availability_time": [
        "11:00:00",
        "13:00:00",
        "15:00:00",
        "17:00:00",
      ]
    },
    "wednesday": {
      "availability_time": [
        "11:00:00",
        "13:00:00",
        "15:00:00",
        "17:00:00",
      ]
    },
    "thursday": {
      "availability_time": [
        "11:00:00",
        "13:00:00",
        "15:00:00",
        "17:00:00",
      ]
    },
    "friday": {
      "availability_time": [
        "11:00:00",
        "13:00:00",
        "15:00:00",
        "17:00:00",
      ]
    }
  }',
  2
)