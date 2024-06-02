const express = require('express')
const cors = require('cors')
const db = require('./models')

const sequelize = require('./config/database')

const app = express()
app.use(cors())

// Routes
const patientsRouter = require('./routes/patients')
const doctorsRouter = require('./routes/doctors')
const appointmentsRouter = require('./routes/appointments')

app.use('/api/patients', patientsRouter)
app.use('/api/doctors', doctorsRouter)
app.use('/api/appointments', appointmentsRouter)


app.get('/api', (req, res) => {
  res.json('Welcome to app backend!')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running in PORT: 3000')
})
