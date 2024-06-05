const {  DataTypes } = require("sequelize")
const { sequelize } = require('../config/database')

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  hospitalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Hospitals',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Doctor'
})

module.exports = Doctor
