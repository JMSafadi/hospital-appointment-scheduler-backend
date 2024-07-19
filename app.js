const express = require('express')
const cors = require('cors')
const connectWithRetry = require('./db/database')

const port = 3000
const app = express()
app.use(cors())
app.use(express.json())

// Routers
const initializeDBRouter = require('./routes/initializeDB/router')
const patientsRouter = require('./routes/patients/router')
const doctorsRouter = require('./routes/doctors/router')
const appointmentsRouter = require('./routes/appointments/router')
const hospitalsRouter = require('./routes/hospitals/router')
const specializationsRouter = require('./routes/specializations/router')

connectWithRetry()
  .then(pool => {
    // Set db pool to all app context
    app.set('pool', pool)

    // Config routes
    app.use('/api/v1/', initializeDBRouter)
    app.use('/api/v1/patients', patientsRouter)
    app.use('/api/v1/doctors', doctorsRouter)
    app.use('/api/v1/appointments', appointmentsRouter)
    app.use('/api/v1/hospitals', hospitalsRouter)
    app.use('/api/v1/specializations', specializationsRouter)

    // Initialize server
    app.listen(port, () => {
      console.log(`Server running in PORT: ${port}`)
    })
  })
  .catch(err => {
    console.error('Failted to connect to database: ', err)
    process.exit(1)
  })
