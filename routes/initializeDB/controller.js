const queries = require('./queries')

const initializeDb = async (req, res) => {
  try {
    const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')

    const client = await pool.connect()
    await client.query(queries.initializeDBQuery)
    client.release()
    res.status(200).json({ message: 'Database Initialized succesfully.' })
  } catch (err) {
    console.error('Error initializing database: ,', err)
    res.status(500).json({ message: 'Error initializing database', error: err.message })
  }
}

const deleteAll = async (req, res) => {
  try {
    const pool = req.app.get('testPool') || req.app.get('pool')
    const client = await pool.connect()
    await client.query(
      `DROP TABLE IF EXISTS Appointments CASCADE;
        DROP TABLE IF EXISTS Availabilities CASCADE;
        DROP TABLE IF EXISTS Doctors CASCADE;
        DROP TABLE IF EXISTS Patients CASCADE;
        DROP TABLE IF EXISTS Specializations CASCADE;
        DROP TABLE IF EXISTS Hospitals CASCADE;

        DROP SEQUENCE IF EXISTS hospitals_id_seq CASCADE;
        DROP SEQUENCE IF EXISTS doctors_id_seq CASCADE;
        DROP SEQUENCE IF EXISTS patients_id_seq CASCADE;
        DROP SEQUENCE IF EXISTS availabilities_id_seq CASCADE;
        DROP SEQUENCE IF EXISTS appointments_id_seq CASCADE;

      `)
      res.status(200).json({ message: "All tables deleted." })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  }
}


module.exports = {
  initializeDb,
  deleteAll
}
