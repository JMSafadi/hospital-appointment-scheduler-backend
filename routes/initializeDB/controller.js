const queries = require('./queries')

const initializeDb = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  let client
  try {
    client  = await pool.connect()
    await client.query(queries.initializeDBQuery)
    res.status(200).json({ message: 'Database Initialized succesfully.' })
  } catch (err) {
    res.status(500).json({ message: 'Error initializing database', error: err.message })
  } finally {
    if (client) client.release()
  }
}

const deleteAll = async (req, res) => {
  const pool = process.env.NODE_ENV === 'test' ? req.app.get('testPool') : req.app.get('pool')
  let client
  try {
    client = await pool.connect()
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
    res.status(200).json({ message: 'All tables deleted.' })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', message: err.message })
  } finally {
    if (client) client.release()
  }
}

module.exports = {
  initializeDb,
  deleteAll
}
