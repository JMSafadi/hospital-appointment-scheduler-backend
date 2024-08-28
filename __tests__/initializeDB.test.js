const request = require('supertest')
const app = require('../app')

describe('Initialize database API', () => {
  let pool
  let authToken
  beforeAll(async () => {
    pool = app.get('testPool')
    authToken = app.get('testToken')
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should return a welcome message', async () => {
    const response = await request(app)
      .get('/api/v1/')
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Welcome to Hospital Appointment Scheduler API.')
  })
  it('should delete all tables in database', async () => {
    const response = await request(app)
      .delete('/api/v1/')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('All tables deleted.')
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
