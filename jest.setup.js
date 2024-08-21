const { initializeDatabase } = require('./utils/initializeDbTest')

let isDatabaseInitialized = false

beforeAll(async () => {
  if (!isDatabaseInitialized) {
    await initializeDatabase()
    isDatabaseInitialized = true
  }
})


// afterAll(async () => {
//   // let client = app.get('dbClient')
//   // client.release()
//   if (!testPool.ended) {
//     await testPool.end()
//     console.log('test pool ended')
//   } else {
//     console.log('test pool not closed')
//   }
// })
