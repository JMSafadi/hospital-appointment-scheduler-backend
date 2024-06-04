const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/database')

const Patient = require('./patient.model')
const Doctor = require('./doctor.model')
const Appointment = require('./appointment.model')

// Initialize models
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.Patient = Patient
db.Doctor = Doctor
db.Appointment = Appointment

// Relations

module.exports = db

