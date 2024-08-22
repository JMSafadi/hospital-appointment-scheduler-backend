const request = require('supertest')
const app = require('../app')
const queries = require('../routes/appointments/queries')

let pool
let authToken
let client

describe('Appointments route', () => {
  beforeAll(async () => {
    pool = app.get('testPool')
    client = app.get('dbClient')
    authToken = app.get('testToken')
  })
  it('should return error if there are not appointments scheduled', async () => {
    const response = await request(app)
      .get('/api/v1/appointments')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('There are no appointments scheduled yet.')
  })
  it('should return error if appointment ID not exist', async () => {
    const response = await request(app)
      .post('/api/v1/appointments/create')
      .send({ availabilityId: 9999 })
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Availability not found.')
  })
  it('should create a new appointment', async () => {
    const response = await request(app)
      .post('/api/v1/appointments/create')
      .send({ availabilityId: 2 })
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(201)
    expect(response.body).toStrictEqual({
      message: "Appointment created succesfully for patient Test User",
      date: "2024-12-10 12:00:00",
      hospital: "Harmony Medical Clinic",
      doctor: "Dr. Braden Ashley"
    })
  })
  it('should retrieve a list with all appointments', async () => {
    const response = await request(app)
      .get('/api/v1/appointments')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThan(0)
  })
  it('should retrieve an appointment by ID', async () => {
    const response = await request(app)
      .get('/api/v1/appointments/1')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBe(1)
    expect(response.body[0].id).toBe(1)
  })
  it('should return error if appointment ID not exists', async () => {
    const response = await request(app)
      .get('/api/v1/appointments/9999')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('ID appointment not found.')
  })
  it('should delete an appointment by ID', async () => {
    const response = await request(app)
      .delete('/api/v1/appointments/1')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('The appointment has been deleted successfully.')
  })
  it('should return error if try to delete an non-existent appointment', async () => {
    const response = await request(app)
      .delete('/api/v1/appointments/9999')
      .set('x-auth-token', authToken)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('ID appointment not found.')
  })
  it('should return error if no doctor for the required specialization', async () => {
    jest.spyOn(client, 'query').mockImplementation((query, values) => {
      if (query === queries.getDoctorBySpecialization) {
        console.log('mocking')
        return { rows: [] }
      }
      return null
    })
    const response = await request(app)
      .post('/api/v1/appointments/search')
      .set('x-auth-token', authToken)
      .send({
        specialization: 'non-existent specialization',
      })
      expect(response.statusCode).toBe(404)
      expect(response.body.message).toBe('No doctor found for the required specialization.')
  })
})
