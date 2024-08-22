const request = require('supertest')
const app = require('../app')

let pool
let authToken

describe('Hospitals route', () => {
  beforeAll(async () => {
    pool = app.get('testPool')
    authToken = app.get('testToken')
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should retrieve a list with all hospitals', async () => {
    const response = await request(app)
      .get('/api/v1/hospitals')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThan(0)
  })
  it('should retrieve a hospital by ID', async () => {
    const response = await request(app)
      .get('/api/v1/hospitals/1')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0].id).toBe(1)
  })
  it('should return error and message if hospital not exists', async () => {
    const response = await request(app)
      .get('/api/v1/hospitals/99999')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('ID hospital not found.')
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
