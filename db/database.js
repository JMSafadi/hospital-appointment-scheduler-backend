require('dotenv').config()
const { Pool } = require('pg')

const connectDatabase = async () => {
  const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432
  })
  try {
    await pool.connect()
    console.log('Connected to database successfully')
    return pool
  } catch (err) {
    console.error('Database connection error: ', err)
  }
}

module.exports = connectDatabase
