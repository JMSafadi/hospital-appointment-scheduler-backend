const { Sequelize } = require("sequelize");
const sequelize = require('../config/database')

const Patient = require('./patient.model')
const Doctor = require('./doctor.model')
const Appointment = require('./appointment.model')
const Hospital = require('./hospital.model')

// Initialize models
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.Patient = Patient
db.Doctor = Doctor
db.Appointment = Appointment
db.Hospital = Hospital

// Relations
Doctor.belongsTo(Hospital, { foreignKey: 'hospitalId' })
Hospital.hasMany(Doctor, { foreignKey: 'hospitalId' })

Appointment.belongsTo()

module.exports = db

