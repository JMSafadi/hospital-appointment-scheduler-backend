CREATE TABLE Doctors (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  specializationId VARCHAR(50) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  availability JSON NOT NULL,
  hospitalId INTEGER NOT NULL,
  FOREIGN KEY (hospitalId) REFERENCES Hospitals(id),
  FOREIGN KEY (specializationId) REFERENCES Specializations(id),
)

INSERT INTO Doctors (
  name,
  specializationId,
  start_time,
  end_time,
  availability,
  hospitalId
) VALUES 
-- Specialization ID is Foreing key 
('Dr. Braden Ashley', 'Cardiology', '8:00:00', '17:00:00', {
    monday: {
      availability_time: [
        '10:00:00',
        '12:00:00',
        '14:00:00',
      ]
    },
    wednesday: {
      availability_time: [
        '10:00:00',
        '12:00:00',
        '14:00:00',
      ]
    },
    friday: {
      availability_time: [
        '10:00:00',
        '12:00:00',
        '14:00:00',
      ]
    },
  },
  {
    hospital_name: 'Evergreen Health Hospital',
    hospital_address: '14570 Alanna Mountains, New Erickaton, ND 66081'
  }
)

('Dra. Isabella Flores', 'Neurology', '10:00:00', '16:00:00', {
      monday: {
        availability_time: [
          '10:00:00',
          '12:00:00',
          '14:00:00',
        ],
      },
      wednesday: {
        availability_time: [
          '10:00:00',
          '12:00:00',
          '14:00:00',
        ],
      },
      friday: {
        availability_time: [
          '10:00:00',
          '12:00:00',
          '14:00:00',
        ],
      },
    },
  hospital: {
    hospital_name: 'Harmony Medical Clinic',
    hospital_address: 'Suite 142 7891 Breitenberg View, Isaiaston, SC 02475-3700'
  }
)
('Dra. Evelyn Rodriguez', 'Pediatrics', '8:30:00', '15:30:00', {
    tuesday: {
      availability_time: [
        '08:30:00',
        '10:30:00',
        '13:30:00',
      ]
    },
    thursday: {
      availability_time: [
        '08:30:00',
        '10:30:00',
        '13:30:00',
      ]
    }
  },
  hospital: {
    hospital_name: 'Evergreen Health Hospital',
    hospital_address: '14570 Alanna Mountains, New Erickaton, ND 66081'
  }
)

('Dra. David Miller', 'Dermatology', '9:00:00', '17:00:00', {
    monday: {
      availability_time: [
        '09:00:00',
        '11:00:00',
        '14:00:00',
        '16:00:00',
      ]
    },
    tuesday: {
      availability_time: [
        '09:00:00',
        '11:00:00',
        '14:00:00',
        '16:00:00',
      ]
    },
    wednesday: {
      availability_time: [
        '09:00:00',
        '11:00:00',
        '14:00:00',
        '16:00:00',
      ]
    },
    thursday: {
      availability_time: [
        '09:00:00',
        '11:00:00',
        '14:00:00',
        '16:00:00',
      ]
    },
    friday: {
      availability_time: [
        '09:00:00',
        '11:00:00',
        '14:00:00',
        '16:00:00',
      ]
    }
  },
  hospital: {
    hospital_name: 'Hopewell Medical Center',
    hospital_address: '3253 Rafael Throughway, Delsieberg, WI 56782-7248'
  }
)

('Dra. Olivia Garcia', 'Orthopedics', '10:30:00', '18:00:00', {
    tuesday: {
      availability_time: [
        '10:30:00',
        '13:30:00',
        '16:30:00',
      ]
    },
    wednesday: {
      availability_time: [
        '10:30:00',
        '13:30:00',
        '16:30:00',
      ]
    },
    thursday: {
      availability_time: [
        '10:30:00',
        '13:30:00',
        '16:30:00',
      ]
    }
  },
  hospital: {
    hospital_name: 'Harmony Medical Clinic',
    hospital_address: 'Suite 142 7891 Breitenberg View, Isaiaston, SC 02475-3700'
  }
)

('Dr. Michael Davis', 'Gastroenterology', '08:00:00', '15:00:00', {
    tuesday: {
      availability_time: [
        '08:00:00',
        '11:00:00',
        '14:00:00',
      ]
    },
    wednesday: {
      availability_time: [
        '08:00:00',
        '11:00:00',
        '14:00:00',
      ]
    },
    friday: {
      availability_time: [
        '08:00:00',
        '11:00:00',
        '14:00:00',
      ]
    }
  },
  hospital: {
    hospital_name: 'Evergreen Health Hospital',
    hospital_address: '14570 Alanna Mountains, New Erickaton, ND 66081'
  }
)

('Dra. Sophia Hernandez', 'Psychiatry', '11:00:00', '19:00:00', {
    monday: {
      availability_time: [
        '11:00:00',
        '13:00:00',
        '15:00:00',
        '17:00:00',
      ]
    },
    tuesday: {
      availability_time: [
        '11:00:00',
        '13:00:00',
        '15:00:00',
        '17:00:00',
      ]
    },
    wednesday: {
      availability_time: [
        '11:00:00',
        '13:00:00',
        '15:00:00',
        '17:00:00',
      ]
    },
    thursday: {
      availability_time: [
        '11:00:00',
        '13:00:00',
        '15:00:00',
        '17:00:00',
      ]
    },
    friday: {
      availability_time: [
        '11:00:00',
        '13:00:00',
        '15:00:00',
        '17:00:00',
      ]
    }
  },
  hospital: {
    hospital_name: 'Hopewell Medical Center',
    hospital_address: '3253 Rafael Throughway, Delsieberg, WI 56782-7248'
  }
)