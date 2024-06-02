const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('hospital_scheduler', 'root', 'yourpassword', {
  host: '127.0.0.1',
  dialect: 'mysql'
})

module.exports = sequelize
