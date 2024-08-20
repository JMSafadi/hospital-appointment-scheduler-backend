const { connectDatabase, closeDatabase } = require('./db/database')
const request = require('supertest')
const app = require('./app')
// const { createTestUserAndGetToken } = require('./utils/authTest')

let client

beforeAll(async () => {
  console.log('starting tests')
  const testPool = await connectDatabase()
  app.set('testPool', testPool)
  client = await testPool.connect()
  app.set('dbClient', client)
  
  const responseDelete = await request(app).delete('/api/v1')
  console.log('database cleanup before test: ', responseDelete.body)

  // const result = await client.query('SELECT * from Doctors')
  // console.log('should be empty: ', result.rows)

  const initializeResponse = await request(app)
    .post('/api/v1/')
    .send()
  if (initializeResponse.statusCode === 200) {
    console.log('Tables and data initialize for tests')
  }
    
  const userResponse = await request(app)
    .post('/api/v1/signin')
    .send({
      name: 'Test User', 
      email: 'testuser@example.com', 
      password: 'password123' 
    })

    const loginResponse = await request(app)
    .post('/api/v1/login')
    .send({ email: 'testuser@example.com', password: 'password123' })

  const token = loginResponse.body.jwt

  app.set('testUser', userResponse.body)
  app.set('testToken', token)

})

// afterAll(async () => {
//   const testPool = app.get('testPool')
//   let client = app.get('dbClient')
//   client.release()
//   if (!testPool.ended) {
//     await testPool.end()
//   }
// })
