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
    console.log('Connection has been established successfully.')
  } catch (err) {
    console.error('Unable to connect to the database: ', err)
  }
}

async function createDatabase() {
  const databaseName = process.env.DB_NAME
  const sequelizeNoDB = new Sequelize(
    null,
    process.env.DB_USER,
    process.env.DB_PASS, {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      port: process.env.DB_PORT,
    }
  )
  try {
    await sequelizeNoDB.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`)
    console.log(`Database ${databaseName} created or already exists.`)
  } catch(err) {
    console.error('Unable to create database: ', err)
  } finally {
    await sequelizeNoDB.close()
  }
}


module.exports = {
  sequelize,
  testConnection,
  createDatabase
}