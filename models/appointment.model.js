const { DataTypes } = require("sequelize")
const sequelize = require('../config/database')

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  patientId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Patient',
      key: 'id'
    }
  },
  hospital: {
    type: DataTypes.STRING,
    allowNull: false
  },
  doctorId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Doctor',
      key: 'id'
    }
  },
  appointment_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false
  }
})

module.exports = Appointment