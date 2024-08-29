const request = require('supertest')
const app = require('../app')

describe('Login route', () => {
  let pool
  let authToken
  beforeAll(async () => {
    pool = app.get('testPool')
    authToken = app.get('testToken')
    console.log('authToken in file test: ', authToken)
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should return a message if user already logged in', async () => {
    const response = await request(app)
      .get('/api/v1/login')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Already logged in.')
  })
  it('should log in user with valid credentiales', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      })
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Logged in successfully.')
    expect(response.body.jwt).toBeDefined()
  })
  it('should fail to log in with invalid email', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'invalidemail@gmail.com',
        password: 'randompass21651'
      })
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Invalid email or password.')
  })
  it('should fail to log in with incorrect password', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'matiasperez200@gmail.com',
        password: 'wrongpassword'
      })
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Invalid email or password.')
  })
  it('should handle server connection errors', async () => {
    // Simulate error
    jest.spyOn(pool, 'connect').mockImplementationOnce(() => {
      throw new Error('Database connection failed')
    })
    const response = await request(app)
      .get('/api/v1/doctors')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe('Internal server error')
    expect(response.body.message).toBe('Database connection failed')
  })
})
