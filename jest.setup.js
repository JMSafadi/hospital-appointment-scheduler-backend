const { initializeDatabaseAndUser } = require('./utils/initializeDbTest')

beforeAll(async () => {
  await initializeDatabaseAndUser()
})

// afterAll(async () => {

// })
