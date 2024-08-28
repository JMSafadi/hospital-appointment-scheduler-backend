const request = require('supertest')
const app = require('../app')

describe('Patients route', () => {
  let pool
  let authToken
  beforeAll(async () => {
    pool = app.get('testPool')
    authToken = app.get('testToken')
  })
  afterEach(() => {
    jest.restoreAllMocks()
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
  it('should return error and message if patient not exists', async () => {
    const response = await request(app)
      .get('/api/v1/patients/9999')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('ID not found.')
  })
  it('should delete a patient by ID', async () => {
    const response = await request(app)
      .delete('/api/v1/patients/1')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Patient deleted successfully')
  })
  it('should return error if try to delete a non-existent patient', async () => {
    const response = await request(app)
      .delete('/api/v1/patients/9999')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Patient not exists. Can\'t be removed')
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
