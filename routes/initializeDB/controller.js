const queries = require('./queries')

const initializeDb = async (req, res) => {
  try {
    // Execute initialize DB query
    const pool = req.app.get('pool')
    console.log(pool)

    const client = await pool.connect()
    console.log('Successfully connected to the database')
    await client.query(queries.initializeDBQuery)
    client.release()
    res.status(200).json({ message: 'Database Initialized succesfully.' })
  } catch (err) {
    console.error('Error initializing database: ,', err)
    res.status(500).json({ message: 'Error initializing database', error: err.message })
  }
}

module.exports = {
  initializeDb
}
