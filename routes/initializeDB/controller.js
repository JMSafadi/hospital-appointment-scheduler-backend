const queries = require('./queries')

const initializeDb = async (req, res) => {
  try {
    // Execute initialize DB query
    const pool = req.app.get('pool')
    const client = await pool.connect()
    await client.query(queries.initializeDbQuery)
    client.release()
    res.status(200).json({ message: 'Database Initialized succesfully.' })
  } catch (err) {
    res.status(500).json({ message: 'Error initializing database' })
  }
}

module.exports = {
  initializeDb
}
