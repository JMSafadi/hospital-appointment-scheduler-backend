const {  DataTypes } = require("sequelize")
const { sequelize } = require('../config/database')

const Hospital = sequelize.define('Hospital', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Hospital'
})

module.exports = Hospital
