const {  DataTypes } = require("sequelize")
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
  work_days: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  availability: {
    type: DataTypes.JSON,
    allowNull: false
  },
  max_age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  hospital: {
    type: DataTypes.JSON,
    allowNull: false
  }
})

module.exports = Doctor
