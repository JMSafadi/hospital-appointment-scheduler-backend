'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Doctors', [
      {
        name: 'Dr. Braden Ashley',
        specialization: 'Cardiology',
        start_time: '8:00:00',
        end_time: '17:00:00',
        availability: {
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
        hospital: {
          hospital_name: 'Evergreen Health Hospital',
          hospital_address: '14570 Alanna Mountains, New Erickaton, ND 66081'
        }
      },
      {
        name: 'Dra. Isabella Flores',
        specialization: 'Neurology',
        start_time: '10:00:00',
        end_time: '16:00:00',
        availability: {
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
      },
      {
        name: 'Dra. Evelyn Rodriguez',
        specialization: 'Pediatrics',
        start_time: '8:30:00',
        end_time: '15:30:00',
        availability: {
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
      },
      {
        name: 'Dra. David Miller',
        specialization: 'Dermatology',
        start_time: '9:00:00',
        end_time: '17:00:00',
        availability: {
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
      },
      {
        name: 'Dra. Olivia Garcia',
        specialization: 'Orthopedics',
        start_time: '10:30:00',
        end_time: '18:00:00',
        availability: {
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
      },
      {
        name: 'Dr. Michael Davis',
        specialization: 'Gastroenterology',
        start_time: '08:00:00',
        end_time: '15:00:00',
        availability: {
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
      },
      {
        name: 'Dra. Sophia Hernandez',
        specialization: 'Psychiatry',
        start_time: '11:00:00',
        end_time: '19:00:00',
        availability: {
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
      },
    ])
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {})
  }
};
