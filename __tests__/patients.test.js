const request = require('supertest')
const app = require('../app')

describe('Doctors route', () => {
  let pool
  let authToken

  beforeAll(async () => {
    pool = app.get('testPool')
    authToken = app.get('testToken')
  })
  it('should retrieve all patients', async () => {
    const response = await request(app)
      .get('/api/v1/patients')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThan(0)
  })
  it('should retrieve a patient by ID', async () => {
    const response = await request(app)
      .get('/api/v1/patients/1')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBe(1)
    expect(response.body[0].id).toBe(1)
  })
})