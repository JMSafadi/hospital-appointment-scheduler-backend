require('dotenv').config()
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
})

async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log('Connection OK :)')
  } catch(err) {
    console.error('Unable to connect :(', err)
  }
}

testConnection()

module.exports = sequelize
