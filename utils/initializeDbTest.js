const request = require('supertest')
const app = require('../app')
const { connectDatabase } = require('../db/database')

let client
let testPool

async function initializeDatabaseAndUser() {
  testPool = await connectDatabase()
  app.set('testPool', testPool)
  client = await testPool.connect()
  app.set('dbClient', client)
  
  const responseDelete = await request(app)
    .delete('/api/v1')
  console.log(responseDelete.body.message)

  const initializeResponse = await request(app)
    .post('/api/v1/')
    .send()
  if (initializeResponse.statusCode === 200) {
    console.log(initializeResponse.body.message)
  }

  const userResponse = await request(app)
    .post('/api/v1/signin')
    .send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    })

  const loginResponse = await request(app)
    .post('/api/v1/login')
    .send({ email: 'testuser@example.com', password: 'password123' })

  const token = loginResponse.body.jwt
  app.set('testUser', userResponse.body)
  app.set('testToken', token)
}

module.exports = {
  initializeDatabaseAndUser
}
