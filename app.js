const express = require('express')
const cors = require('cors')
const connectDatabase = require('./db/database')

const port = 3000
const app = express()
app.use(cors())
app.use(express.json())

connectDatabase()
  .then(pool => {
    // Set db pool to all app context
    app.set('pool', pool)

    // Routers
    const signInRouter = require('./routes/signin/router')
    const logInRouter = require('./routes/login/router')

    const initializeDBRouter = require('./routes/initializeDB/router')

    const patientsRouter = require('./routes/patients/router')
    const doctorsRouter = require('./routes/doctors/router')
    const appointmentsRouter = require('./routes/appointments/router')
    const hospitalsRouter = require('./routes/hospitals/router')
    const specializationsRouter = require('./routes/specializations/router')

    // Config routes
    app.use('/api/v1/signup', signInRouter)
    app.use('/api/v1/login', logInRouter)

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
  }
).catch(err => console.error('Failed to initialize database connection: ', err))
