const { Pool } = require('pg')
require('dotenv').config()

  const connectWithRetry = async (retries = 5, delay = 5000) => {
    while (retries > 0) {
      try {
        const pool = new Pool({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: process.env.DB_PORT || 5432
        })
        await pool.connect()
        console.log('Connected to database successfully')
        return pool
      } catch (err) {
        console.error('Database connection error: ', err)
        retries -= 1
        if (retries > 0) {
          console.log(`Retrying in ${delay / 1000} seconds...`)
          await new Promise(res => setTimeout(res, delay))
        } else {
          console.error('Failed to connect to database after multiple attempts')
          process.exit(1)
        }
      }
    }
  }

module.exports = connectWithRetry
