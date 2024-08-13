const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// Routers
const initializeDBRouter = require('./routes/initializeDB/router')

const signInRouter = require('./routes/signin/router')
const logInRouter = require('./routes/login/router')

const patientsRouter = require('./routes/patients/router')
const doctorsRouter = require('./routes/doctors/router')
const availabilitiesRouter = require('./routes/availabilities/router')
const appointmentsRouter = require('./routes/appointments/router')
const hospitalsRouter = require('./routes/hospitals/router')
const specializationsRouter = require('./routes/specializations/router')

// Config routes
app.use('/api/v1/', initializeDBRouter)

app.use('/api/v1/signin', signInRouter)
app.use('/api/v1/login', logInRouter)

app.use('/api/v1/patients', patientsRouter)
app.use('/api/v1/doctors', doctorsRouter)
app.use('/api/v1/availabilities', availabilitiesRouter)
app.use('/api/v1/appointments', appointmentsRouter)
app.use('/api/v1/hospitals', hospitalsRouter)
app.use('/api/v1/specializations', specializationsRouter)
    
module.exports = app