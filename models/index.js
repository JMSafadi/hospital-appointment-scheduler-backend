const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/database')

const Patient = require('./patient')
const Doctor = require('./doctor')
const Appointment = require('./appointment')

// Initialize models
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.Patient = Patient
db.Doctor = Doctor
db.Appointment = Appointment

// Relations

module.exports = db

