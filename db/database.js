require('dotenv').config()
const { Pool } = require('pg')

let devPool
let testPool

const connectDatabase = async () => {
  if (process.env.NODE_ENV === 'test') {
    try {
      if (!testPool) {
        testPool = new Pool({
          host: process.env.TEST_DB_HOST,
          user: process.env.TEST_DB_USER,
          password: process.env.TEST_DB_PASS,
          database: process.env.TEST_DB_NAME,
          port: process.env.TEST_DB_PORT
        })
      }
      return testPool
    } catch (err) {
      console.error('Error connecting to test database:', err)
      throw err
    }
  } else {
    try {
      if (!devPool) {
        devPool = new Pool({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          port: process.env.DB_PORT
        })
      }
      return devPool
    } catch (err) {
      console.error('Error connecting to database:', err)
      throw err
    }
  }
}

const closeDatabase = async () => {
  if (process.env.NODE_ENV === 'test' && testPool) {
    try {
      await testPool.end()
      testPool = null
      console.log('Test database pool closed.')
    } catch (err) {
      console.error('Error closing test database pool:', err)
    }
  } else if (devPool) {
    try {
      await devPool.end()
      devPool = null
      console.log('Development database pool closed.')
    } catch (err) {
      console.error('Error closing development database pool:', err)
    }
  }
}

module.exports = {
  connectDatabase,
  closeDatabase
}
