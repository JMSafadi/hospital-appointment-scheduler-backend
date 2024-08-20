const request = require('supertest')
const app = require('../app')

describe('Sing in route', () => {
  let pool
  let authToken
  beforeAll(async () => {
    pool = app.get('testPool')
    authToken = app.get('testToken')
  })
  it('should return a message if user is already signed in', async () => {
    const response = await request(app)
      .get('/api/v1/signin')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Already signed in.')
  })
  it('should add a new patient successfully', async () => {
    const response = await request(app)
      .post('/api/v1/signin')
      .send({
        name: 'Test User1', 
        email: 'testuser1@example.com', 
        password: 'password13123' 
      })
    expect(response.statusCode).toBe(201)
    expect(response.body.message).toBe('Patient added successfully.')
  })
  it('should fail if the email already exists', async () => {
    const response = await request(app)
      .post('/api/v1/signin')
      .send({
        name: 'Test User1', 
        email: 'testuser1@example.com', 
        password: 'password13123' 
      })
    expect(response.statusCode).toBe(409)
    expect(response.body.message).toBe('Email already exists.')
  })
})