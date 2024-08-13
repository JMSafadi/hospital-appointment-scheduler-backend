const app = require('./app')
const connectDatabase = require('./db/database')
const port = 3000

connectDatabase()
  .then(pool => {
    // Set db pool to all app context
    app.set('pool', pool)
    // Initialize server
    app.listen(port, () => {
      console.log(`Server running in PORT: ${port}`)
    })
  })
  .catch(err => console.error('Failed to initialize database connection: ', err))
