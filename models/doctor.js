const { DataTypes } = require("sequelize")
const sequelize = require('../config/database')

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  work_schedule: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: { // Nested with work_schedule?
    type: DataTypes.STRING,
    allowNull: false,
  },
  max_age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  hospital: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Doctor
