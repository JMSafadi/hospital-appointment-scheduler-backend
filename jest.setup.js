const { initializeDatabaseAndUser } = require('./utils/initializeDbTest')

beforeAll(async () => {
  console.log('Initializing database and user for tests.')
  await initializeDatabaseAndUser()
})

// afterAll(async () => {

// })
