const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

module.exports = pool
