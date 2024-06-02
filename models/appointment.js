const { DataTypes } = require("sequelize")
const sequelize = require('../config/database')

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  patient: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hospital: {
    type: DataTypes.STRING,
    allowNull: false
  },
  doctor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  appointment_date: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Appointment