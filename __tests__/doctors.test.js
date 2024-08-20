const request = require('supertest')
const app = require('../app')

let pool
let authToken

describe('Doctors route', () => {
  beforeAll(async () => {
    pool = app.get('testPool')
    authToken = app.get('testToken')
  })
  it('should return a list with all doctors', async () => {
    const response = await request(app)
      .get('/api/v1/doctors')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
  it('should retrieve a doctor by ID', async () => {
    const response = await request(app)
      .get('/api/v1/doctors/1')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBe(1)
    expect(response.body[0].id).toBe(1)
  })
  it('should return error and message if doctor not exist', async () => {
    const response = await request(app)
      .get('/api/v1/doctors/99999')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('ID doctor not found.')
  })
  it('should handle database connection errors', async () => {
    // Simulate error
    jest.spyOn(pool, 'connect').mockRejectedValue(new Error('Database connection error'))
    const response = await request(app)
      .get('/api/v1/doctors')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe('Internal server error')
  })
})