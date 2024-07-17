const express = require('express')
const cors = require('cors')

const port = 3000
const app = express()
app.use(cors())
app.use(express.json())

// Routers
const initializeDBRouter = require('./routes/initializeDB.router')
const patientsRouter = require('./routes/patients.router')
const doctorsRouter = require('./routes/doctors.router')
const appointmentsRouter = require('./routes/appointments.router')
const hospitalsRouter = require('./routes/hospitals.router')
const specializationsRouter = require('./routes/specializations.router')

app.use('/api', initializeDBRouter)
app.use('/api/patients', patientsRouter)
app.use('/api/doctors', doctorsRouter)
app.use('/api/appointments', appointmentsRouter)
app.use('/api/hospitals', hospitalsRouter)
app.use('/api/specializations', specializationsRouter)

app.listen(process.env.PORT || port, () => {
  console.log(`Server running in PORT: ${port}`)
})
